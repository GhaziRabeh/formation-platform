<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'email_otp_hash',
        'email_otp_expires_at',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'email_otp_hash',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'email_otp_expires_at' => 'datetime',
    ];

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isFormateur(): bool
    {
        return $this->role === 'formateur';
    }

    public function isParticipant(): bool
    {
        return $this->role === 'participant';
    }

    // Ateliers animés par le formateur
    public function ateliersAnimes()
    {
        return $this->hasMany(Atelier::class, 'formateur_id');
    }

    // Inscriptions du participant
    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    // Ateliers auxquels le participant est inscrit
    public function ateliersInscrits()
    {
        return $this->belongsToMany(Atelier::class, 'inscriptions')
            ->withPivot('id', 'statut', 'date_inscription')
            ->withTimestamps();
    }
}
