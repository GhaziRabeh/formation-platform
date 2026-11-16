<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    protected $fillable = [
        'user_id',
        'atelier_id',
        'statut',
        'date_inscription',
    ];

    protected $casts = [
        'date_inscription' => 'datetime',
    ];

    // Participant
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Atelier
    public function atelier()
    {
        return $this->belongsTo(Atelier::class);
    }
}
