<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password = null;

    public function definition(): array
    {
        $faker = fake('fr_FR');

        return [
            'name' => $faker->name(),
            'email' => $faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('Password123'),
            'role' => 'participant',
            'remember_token' => Str::random(10),
        ];
    }

    // Admin user
    public function admin(): static
    {
        return $this->state(fn () => ['role' => 'admin']);
    }

    // Formateur user
    public function formateur(): static
    {
        return $this->state(fn () => ['role' => 'formateur']);
    }

    // Participant user
    public function participant(): static
    {
        return $this->state(fn () => ['role' => 'participant']);
    }

    // Unverified email
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
