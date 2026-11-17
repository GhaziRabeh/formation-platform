<?php

use App\Http\Controllers\Api\AtelierController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\InscriptionController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/verify-email', [RegisterController::class, 'verifyEmail']);
Route::post('/resend-email-otp', [RegisterController::class, 'resendEmailOtp']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendOtp']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    // Current user
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    // Logout
    Route::post('/logout', [LogoutController::class, 'logout']);

    // Ateliers
    Route::get('/ateliers', [AtelierController::class, 'index']);
    Route::get('/ateliers/{id}', [AtelierController::class, 'show']);

    Route::post('/ateliers', [AtelierController::class, 'store']);
    Route::post('/ateliers/{id}', [AtelierController::class, 'update']);

    Route::delete('/ateliers/{id}', [AtelierController::class, 'destroy']);

    Route::get('/ateliers/{id}/participants', [AtelierController::class, 'participants']);

    // Inscriptions
    Route::get('/inscriptions', [InscriptionController::class, 'index']);
    Route::get('/mes-inscriptions', [InscriptionController::class, 'mesInscriptions']);
    Route::post('/inscriptions', [InscriptionController::class, 'store']);

    Route::patch('/inscriptions/{id}/annuler', [InscriptionController::class, 'annuler']);

    // Admin and formateur
    Route::get('/ateliers/{id}/inscriptions', [InscriptionController::class, 'inscriptionsAtelier']);
    Route::patch('/inscriptions/{id}/statut', [InscriptionController::class, 'updateStatus']);

    // Users
    Route::get('/users', [UserController::class, 'index']);
});
