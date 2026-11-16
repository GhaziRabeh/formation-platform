<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('Password123'),
                'role' => 'admin',
            ],
            [
                'name' => 'Formateur',
                'email' => 'formateur@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('Password123'),
                'role' => 'formateur',
            ],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                $user
            );
        }
    }
}
