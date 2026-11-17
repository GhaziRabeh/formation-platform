<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {}

    // Get all users
    public function index(Request $request)
    {
        Gate::authorize('viewAny', User::class);

        $request->validate([
            'role' => [
                'nullable',
                Rule::in(['admin', 'formateur', 'participant']),
            ],
        ]);

        $users = $this->userService->getAll(
            $request->query('role')
        );

        return UserResource::collection($users);
    }
}
