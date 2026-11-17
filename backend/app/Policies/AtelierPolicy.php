<?php

namespace App\Policies;

use App\Models\Atelier;
use App\Models\User;

class AtelierPolicy
{
    // View ateliers
    public function viewAny(User $user): bool
    {
        return $user->isAdmin()
            || $user->isFormateur()
            || $user->isParticipant();
    }

    public function view(User $user, Atelier $atelier): bool
    {
        return $user->isAdmin()
            || (
                $user->isFormateur()
                && $user->id === $atelier->formateur_id
            );
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Atelier $atelier): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Atelier $atelier): bool
    {
        return $user->isAdmin();
    }

    public function viewParticipants(
        User $user,
        Atelier $atelier
    ): bool {
        return $user->isAdmin()
            || (
                $user->isFormateur()
                && $user->id === $atelier->formateur_id
            );
    }
}
