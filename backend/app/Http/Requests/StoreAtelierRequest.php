<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAtelierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'lieu' => ['required', 'string', 'max:255'],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'date_debut' => ['required', 'date'],
            'date_fin' => [
                'required',
                'date',
                'after:date_debut',
            ],

            'capacite' => ['required', 'integer', 'min:1'],

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
                'required',
                Rule::exists('users', 'id')
                    ->where('role', 'formateur'),
            ],
        ];
    }
}
