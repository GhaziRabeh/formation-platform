<?php

namespace App\Policies;

use App\Models\Atelier;
use App\Models\Inscription;
use App\Models\User;

class InscriptionPolicy
{
    // Seul un participant peut s'inscrire
    public function create(User $user): bool
    {
        return $user->isParticipant();
    }

    // Consulter ses propres inscriptions
    public function viewOwn(User $user, Inscription $inscription): bool
    {
        return $user->id === $inscription->user_id;
    }

    // Admin ou formateur responsable peut consulter
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

    // Annuler une inscription
    public function cancel(User $user, Inscription $inscription): bool
    {
        return $user->id === $inscription->user_id
            || $user->isAdmin()
            || (
                $user->isFormateur()
                && $user->id === $inscription->atelier->formateur_id
            );
    }

    // Modifier le statut
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
