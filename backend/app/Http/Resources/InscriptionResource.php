<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InscriptionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'statut' => $this->statut,

            'date_inscription' => $this->date_inscription,

            'participant' => [
                'id' => $this->whenLoaded(
                    'user',
                    fn () => $this->user?->id
                ),

                'name' => $this->whenLoaded(
                    'user',
                    fn () => $this->user?->name
                ),

                'email' => $this->whenLoaded(
                    'user',
                    fn () => $this->user?->email
                ),
            ],

            'atelier' => [
                'id' => $this->whenLoaded(
                    'atelier',
                    fn () => $this->atelier?->id
                ),

                'title' => $this->whenLoaded(
                    'atelier',
                    fn () => $this->atelier?->title
                ),

                'lieu' => $this->whenLoaded(
                    'atelier',
                    fn () => $this->atelier?->lieu
                ),

                'date_debut' => $this->whenLoaded(
                    'atelier',
                    fn () => $this->atelier?->date_debut
                ),

                'date_fin' => $this->whenLoaded(
                    'atelier',
                    fn () => $this->atelier?->date_fin
                ),
            ],

            'created_at' => $this->created_at,
        ];
    }
}
