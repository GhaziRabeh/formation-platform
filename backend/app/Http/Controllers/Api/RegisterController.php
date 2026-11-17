<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\VerifyEmailOtpRequest;
use App\Services\RegisterService;

class RegisterController extends Controller
{
    public function __construct(
        private RegisterService $registerService
    ) {}

    public function register(RegisterRequest $request)
    {
        $user = $this->registerService->register(
            $request->validated()
        );

        return response()->json([
            'message' => 'Account created. Check your email for the OTP.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ], 201);
    }

    public function verifyEmail(VerifyEmailOtpRequest $request)
    {
        $this->registerService->verifyEmail(
            $request->validated()
        );

        return response()->json([
            'message' => 'Email verified successfully.',
        ]);
    }

    public function resendEmailOtp(ForgotPasswordRequest $request)
    {
        $this->registerService->resendEmailOtp(
            $request->validated()
        );

        return response()->json([
            'message' => 'Verification code sent successfully.',
        ]);
    }
}