<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Psr\Log\LogLevel;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $levels = [
    ];

    protected $dontReport = [
    ];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
        });

        // Unauthenticated
        $this->renderable(function (
            AuthenticationException $e,
            Request $request
        ) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Unauthenticated.',
                ], 401);
            }
        });

        // Register errors
        $this->renderable(function (
            RegisterException $e,
            Request $request
        ) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 422);
        });

        // Login errors
        $this->renderable(function (
            LoginException $e,
            Request $request
        ) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 401);
        });

        // Logout errors
        $this->renderable(function (
            LogoutException $e,
            Request $request
        ) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        });

        // Forgot password errors
        $this->renderable(function (
            ForgotPasswordException $e,
            Request $request
        ) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 422);
        });

        $this->renderable(function (Throwable $e, Request $request) {
            // Validation errors
            if ($e instanceof ValidationException) {
                return null;
            }

            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage() ?: 'Server error.',
                ], method_exists($e, 'getStatusCode')
                    ? $e->getStatusCode()
                    : 500);
            }
        });
    }
}
