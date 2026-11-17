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
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'token',
        'email_otp_hash',
        'email_otp_expires_at',
        'password_reset_otp_hash',
        'password_reset_otp_expires_at',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'email_otp_expires_at' => 'datetime',
        'password_reset_otp_expires_at' => 'datetime',
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

    // Formateur ateliers
    public function ateliersAnimes()
    {
        return $this->hasMany(Atelier::class, 'formateur_id');
    }

    // Participant inscriptions
    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    // Participant ateliers
    public function ateliersInscrits()
    {
        return $this->belongsToMany(Atelier::class, 'inscriptions')
            ->withPivot('id', 'statut', 'date_inscription')
            ->withTimestamps();
    }
}
