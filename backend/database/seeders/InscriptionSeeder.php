<?php

namespace Database\Seeders;

use App\Models\Atelier;
use App\Models\Inscription;
use App\Models\User;
use Illuminate\Database\Seeder;

class InscriptionSeeder extends Seeder
{
    public function run(): void
    {
        $participants = User::where('role', 'participant')
            ->whereNotNull('email_verified_at')
            ->get();

        foreach (Atelier::all() as $atelier) {
            // Keep free places on planned ateliers
            $max = $atelier->statut === 'planifie'
                ? max(0, $atelier->capacite - 2)
                : $atelier->capacite;

            $active = rand((int) ceil($max / 3), $max);
            $cancelled = rand(0, 2);

            $selected = $participants->shuffle()
                ->take($active + $cancelled)
                ->values();

            foreach ($selected as $index => $participant) {
                Inscription::factory()->create([
                    'user_id' => $participant->id,
                    'atelier_id' => $atelier->id,
                    'statut' => $index < $active
                        ? $this->activeStatut($atelier->statut)
                        : 'annulee',
                    'date_inscription' => fake()->dateTimeBetween(
                        min($atelier->date_debut, now())->copy()->subDays(30),
                        min($atelier->date_debut, now())
                    ),
                ]);
            }
        }
    }

    // Get status by atelier status
    private function activeStatut(string $atelierStatut): string
    {
        return match ($atelierStatut) {
            'planifie' => fake()->randomElement(['en_attente', 'confirmee']),
            'annule' => 'annulee',
            default => 'confirmee',
        };
    }
}
