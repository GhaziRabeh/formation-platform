<?php

namespace Database\Factories;

use App\Models\Atelier;
use App\Models\Inscription;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InscriptionFactory extends Factory
{
    protected $model = Inscription::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory()->participant(),
            'atelier_id' => Atelier::factory(),
            'statut' => 'en_attente',
            'date_inscription' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    // Pending inscription
    public function enAttente(): static
    {
        return $this->state(fn () => ['statut' => 'en_attente']);
    }

    // Confirmed inscription
    public function confirmee(): static
    {
        return $this->state(fn () => ['statut' => 'confirmee']);
    }

    // Cancelled inscription
    public function annulee(): static
    {
        return $this->state(fn () => ['statut' => 'annulee']);
    }
}
