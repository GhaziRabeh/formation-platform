<?php

namespace App\Services;

use App\Models\Atelier;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AtelierService
{
    public function getAll(User $user)
    {
        // Count active participants
        $participantsCount = [
            'inscriptions as participants_count' => function ($query) {
                $query->whereIn('statut', ['en_attente', 'confirmee']);
            },
        ];

        if ($user->isAdmin()) {
            return Atelier::with('formateur')
                ->withCount($participantsCount)
                ->latest()
                ->get();
        }

        // Participant catalogue
        if ($user->isParticipant()) {
            return Atelier::with('formateur')
                ->withCount($participantsCount)
                ->where('statut', 'planifie')
                ->where('date_debut', '>', now())
                ->orderBy('date_debut')
                ->get();
        }

        return $user->ateliersAnimes()
            ->with('formateur')
            ->withCount($participantsCount)
            ->latest()
            ->get();
    }

    public function getById(int $id): Atelier
    {
        return Atelier::with('formateur')->findOrFail($id);
    }

    private function uploadImage($image): string
    {
        return $image->store('ateliers', 'public');
    }

    public function create(array $data): Atelier
    {
        if (isset($data['image'])) {
            $data['image'] = $this->uploadImage($data['image']);
        }

        $atelier = Atelier::create($data);

        return $atelier->load('formateur');
    }

    public function update(Atelier $atelier, array $data): Atelier
    {
        if (isset($data['capacite'])) {
            $nbInscriptions = $atelier->inscriptions()
                ->whereIn('statut', ['en_attente', 'confirmee'])
                ->count();

            if ($data['capacite'] < $nbInscriptions) {
                throw ValidationException::withMessages([
                    'capacite' => [
                        'La capacité est inférieure au nombre d’inscriptions actives.',
                    ],
                ]);
            }
        }

        $ancienneImage = $atelier->image;

        if (isset($data['image'])) {
            $data['image'] = $this->uploadImage($data['image']);
        }

        $atelier->update($data);

        if (isset($data['image']) && $ancienneImage) {
            Storage::disk('public')->delete($ancienneImage);
        }

        return $atelier->fresh()->load('formateur');
    }

    public function delete(Atelier $atelier): void
    {
        $image = $atelier->image;

        $atelier->delete();

        if ($image) {
            Storage::disk('public')->delete($image);
        }
    }

    public function getParticipants(Atelier $atelier)
    {
        return $atelier->inscriptions()
            ->whereIn('statut', ['en_attente', 'confirmee'])
            ->with('user:id,name,email')
            ->get()
            ->map(function ($inscription) {
                return [
                    'inscription_id' => $inscription->id,
                    'user_id' => $inscription->user->id,
                    'name' => $inscription->user->name,
                    'email' => $inscription->user->email,
                    'statut' => $inscription->statut,
                    'date_inscription' => $inscription->date_inscription,
                ];
            });
    }
}
