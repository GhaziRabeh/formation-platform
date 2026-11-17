<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    // Check admin role
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }
}
