<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atelier extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'lieu',
        'image',
        'date_debut',
        'date_fin',
        'capacite',
        'statut',
        'formateur_id',
    ];

    protected $casts = [
        'date_debut' => 'datetime',
        'date_fin' => 'datetime',
    ];

    protected $appends = ['image_url'];

    // Formateur
    public function formateur()
    {
        return $this->belongsTo(User::class, 'formateur_id');
    }

    // Inscriptions
    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    // Participants
    public function participants()
    {
        return $this->belongsToMany(User::class, 'inscriptions')
            ->withPivot('id', 'statut', 'date_inscription')
            ->withTimestamps();
    }

    // Image URL
    public function getImageUrlAttribute()
    {
        return $this->image
            ? asset('storage/'.$this->image)
            : null;
    }
}
