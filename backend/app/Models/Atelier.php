<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atelier extends Model
{
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

    // Relation avec le formateur
    public function formateur()
    {
        return $this->belongsTo(User::class, 'formateur_id');
    }

    // Relation avec les inscriptions
    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    // Relation avec les participants
    public function participants()
    {
        return $this->belongsToMany(User::class, 'inscriptions')
            ->withPivot('id', 'statut', 'date_inscription')
            ->withTimestamps();
    }

    // URL publique de l'image
    public function getImageUrlAttribute()
    {
        return $this->image
            ? asset('storage/'.$this->image)
            : null;
    }
}
