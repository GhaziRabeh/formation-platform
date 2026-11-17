<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    // Get all users
    public function getAll(?string $role = null)
    {
        return User::query()
            ->when($role, fn ($query) => $query->where('role', $role))
            ->latest()
            ->get();
    }
}
