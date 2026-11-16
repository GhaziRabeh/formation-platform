<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInscriptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'atelier_id' => [
                'required',
                'integer',
                Rule::exists('ateliers', 'id'),
            ],
        ];
    }
}
