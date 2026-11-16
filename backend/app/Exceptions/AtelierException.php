<?php

namespace App\Exceptions;

use Exception;

class AtelierException extends Exception
{
    public static function notFound(): self
    {
        return new self('Atelier introuvable.');
    }

    public static function invalidFormateur(): self
    {
        return new self('Le formateur sélectionné est invalide.');
    }

    public static function capacityTooLow(): self
    {
        return new self(
            "La capacité est inférieure au nombre d'inscriptions actives."
        );
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], 422);
    }
}
