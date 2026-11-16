<?php

namespace App\Services;

use App\Models\Atelier;
use App\Models\Inscription;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class InscriptionService
{
    // Inscrire un participant
    public function inscrire(User $user, int $atelierId): Inscription
    {
        return DB::transaction(function () use ($user, $atelierId) {

            $atelier = Atelier::whereKey($atelierId)
                ->lockForUpdate()
                ->firstOrFail();

            if ($atelier->statut !== 'planifie') {
                throw ValidationException::withMessages([
                    'atelier_id' => [
                        'Cet atelier n’est pas disponible pour les inscriptions.',
                    ],
                ]);
            }

            $inscription = Inscription::where('user_id', $user->id)
                ->where('atelier_id', $atelier->id)
                ->first();

            if ($inscription && $inscription->statut !== 'annulee') {
                throw ValidationException::withMessages([
                    'atelier_id' => [
                        'Vous êtes déjà inscrit à cet atelier.',
                    ],
                ]);
            }

            $nombreInscriptions = $atelier->inscriptions()
                ->whereIn('statut', ['en_attente', 'confirmee'])
                ->count();

            if ($nombreInscriptions >= $atelier->capacite) {
                throw ValidationException::withMessages([
                    'atelier_id' => [
                        'La capacité maximale de cet atelier est atteinte.',
                    ],
                ]);
            }

            if ($inscription) {
                $inscription->update([
                    'statut' => 'en_attente',
                    'date_inscription' => now(),
                ]);
            } else {
                $inscription = Inscription::create([
                    'user_id' => $user->id,
                    'atelier_id' => $atelier->id,
                    'statut' => 'en_attente',
                    'date_inscription' => now(),
                ]);
            }

            return $inscription->load(['user', 'atelier']);
        });
    }

    // Liste des inscriptions d'un participant
    public function mesInscriptions(User $user)
    {
        return $user->inscriptions()
            ->with('atelier.formateur')
            ->latest()
            ->get();
    }

    // Liste des inscriptions d'un atelier
    public function inscriptionsAtelier(Atelier $atelier)
    {
        return $atelier->inscriptions()
            ->with(['user', 'atelier'])
            ->latest()
            ->get();
    }

    // Toutes les inscriptions pour l'Admin
    public function toutesLesInscriptions()
    {
        return Inscription::with([
            'user:id,name,email',
            'atelier:id,title,formateur_id',
            'atelier.formateur:id,name,email',
        ])
            ->latest()
            ->get();
    }

    // Trouver une inscription
    public function getById(int $id): Inscription
    {
        return Inscription::with(['user', 'atelier.formateur'])
            ->findOrFail($id);
    }

    // Modifier le statut
    public function updateStatus(
        Inscription $inscription,
        string $statut
    ): Inscription {
        if (
            $inscription->statut === 'annulee'
            && $statut === 'confirmee'
        ) {
            throw ValidationException::withMessages([
                'statut' => [
                    'Une inscription annulée doit être réactivée par une nouvelle inscription.',
                ],
            ]);
        }

        $inscription->update([
            'statut' => $statut,
        ]);

        return $inscription->load(['user', 'atelier']);
    }

    // Annuler une inscription
    public function annuler(Inscription $inscription): Inscription
    {
        if ($inscription->statut === 'annulee') {
            throw ValidationException::withMessages([
                'statut' => [
                    'Cette inscription est déjà annulée.',
                ],
            ]);
        }

        $inscription->update([
            'statut' => 'annulee',
        ]);

        return $inscription->load(['user', 'atelier']);
    }
}
