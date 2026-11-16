<?php

namespace App\Exceptions;

use Exception;

class InscriptionException extends Exception
{
    public static function atelierNotFound(): self
    {
        return new self('Atelier introuvable.');
    }

    public static function alreadyRegistered(): self
    {
        return new self('Vous êtes déjà inscrit à cet atelier.');
    }

    public static function capacityReached(): self
    {
        return new self('La capacité maximale est atteinte.');
    }

    public static function registrationClosed(): self
    {
        return new self('Les inscriptions sont fermées.');
    }

    public static function notFound(): self
    {
        return new self('Inscription introuvable.');
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], 422);
    }
}
