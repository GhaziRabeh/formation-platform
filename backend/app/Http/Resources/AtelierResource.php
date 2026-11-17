<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AtelierResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'lieu' => $this->lieu,
            'image' => $this->image
                ? url('storage/' . ltrim(str_replace('storage/', '', $this->image), '/'))
                : null,
            'date_debut' => $this->date_debut,
            'date_fin' => $this->date_fin,
            'capacite' => $this->capacite,
            'statut' => $this->statut,

            'participants_count' => $this->whenCounted('participants'),

            'formateur' => [
                'id' => $this->whenLoaded('formateur', fn () => $this->formateur?->id),
                'name' => $this->whenLoaded('formateur', fn () => $this->formateur?->name),
                'email' => $this->whenLoaded('formateur', fn () => $this->formateur?->email),
            ],

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
