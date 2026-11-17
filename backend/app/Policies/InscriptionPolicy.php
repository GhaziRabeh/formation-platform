<?php

namespace App\Policies;

use App\Models\Atelier;
use App\Models\Inscription;
use App\Models\User;

class InscriptionPolicy
{
    // Create inscription
    public function create(User $user): bool
    {
        return $user->isParticipant();
    }

    // View own inscriptions
    public function viewOwn(User $user, Inscription $inscription): bool
    {
        return $user->id === $inscription->user_id;
    }

    // View atelier inscriptions
    public function viewAtelierInscriptions(
        User $user,
        Atelier $atelier
    ): bool {
        return $user->isAdmin()
            || (
                $user->isFormateur()
                && $user->id === $atelier->formateur_id
            );
    }

    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    // Cancel inscription
    public function cancel(User $user, Inscription $inscription): bool
    {
        return $user->id === $inscription->user_id
            || $user->isAdmin()
            || (
                $user->isFormateur()
                && $user->id === $inscription->atelier->formateur_id
            );
    }

    // Update status
    public function updateStatus(
        User $user,
        Inscription $inscription
    ): bool {
        return $user->isAdmin()
            || (
                $user->isFormateur()
                && $user->id === $inscription->atelier->formateur_id
            );
    }
}
