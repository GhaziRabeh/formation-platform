<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FakeUserSeeder extends Seeder
{
    public function run(): void
    {
        // Test participant account
        User::updateOrCreate(
            ['email' => 'participant@example.com'],
            [
                'name' => 'Participant',
                'email_verified_at' => now(),
                'password' => Hash::make('Password123'),
                'role' => 'participant',
            ]
        );

        // Create admins
        User::factory()->count(2)->admin()->create();

        // Create formateurs
        User::factory()->count(5)->formateur()->create();

        // Create participants
        User::factory()->count(30)->participant()->create();

        // Create unverified participants
        User::factory()->count(3)->participant()->unverified()->create();
    }
}
