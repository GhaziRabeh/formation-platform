<?php

namespace App\Http\Requests;

use App\Models\Atelier;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAtelierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'lieu' => ['sometimes', 'required', 'string', 'max:255'],

            'image' => [
                'sometimes',
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'date_debut' => ['sometimes', 'required', 'date'],
            'date_fin' => ['sometimes', 'required', 'date'],

            'capacite' => ['sometimes', 'required', 'integer', 'min:1'],

            'statut' => [
                'sometimes',
                Rule::in([
                    'planifie',
                    'en_cours',
                    'termine',
                    'annule',
                ]),
            ],

            'formateur_id' => [
                'sometimes',
                'required',
                Rule::exists('users', 'id')
                    ->where('role', 'formateur'),
            ],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $atelier = $this->route('id')
                ? Atelier::find($this->route('id'))
                : null;

            $dateDebut = $this->input('date_debut')
                ?? $atelier?->date_debut;

            $dateFin = $this->input('date_fin')
                ?? $atelier?->date_fin;

            if (
                $dateDebut &&
                $dateFin &&
                strtotime($dateFin) <= strtotime($dateDebut)
            ) {
                $validator->errors()->add(
                    'date_fin',
                    'La date de fin doit être après la date de début.'
                );
            }
        });
    }
}
