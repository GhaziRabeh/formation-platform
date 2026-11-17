<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAtelierRequest;
use App\Http\Requests\UpdateAtelierRequest;
use App\Http\Resources\AtelierResource;
use App\Models\Atelier;
use App\Services\AtelierService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AtelierController extends Controller
{
    public function __construct(
        protected AtelierService $atelierService
    ) {}

    // Get all ateliers
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Atelier::class);

        $ateliers = $this->atelierService->getAll(
            $request->user()
        );

        return AtelierResource::collection($ateliers);
    }

    // Get atelier
    public function show(int $id)
    {
        $atelier = $this->atelierService->getById($id);

        Gate::authorize('view', $atelier);

        return new AtelierResource($atelier);
    }

    // Create atelier
    public function store(StoreAtelierRequest $request)
    {
        Gate::authorize('create', Atelier::class);

        $atelier = $this->atelierService->create(
            $request->validated()
        );

        return (new AtelierResource($atelier))
            ->response()
            ->setStatusCode(201);
    }

    // Update atelier
    public function update(UpdateAtelierRequest $request, int $id)
    {
        $atelier = $this->atelierService->getById($id);

        Gate::authorize('update', $atelier);

        $atelier = $this->atelierService->update(
            $atelier,
            $request->validated()
        );

        return new AtelierResource($atelier);
    }

    // Delete atelier
    public function destroy(int $id)
    {
        $atelier = $this->atelierService->getById($id);

        Gate::authorize('delete', $atelier);

        $this->atelierService->delete($atelier);

        return response()->json([
            'message' => 'Atelier supprimé avec succès',
        ]);
    }

    // Get atelier participants
    public function participants(int $id)
    {
        $atelier = $this->atelierService->getById($id);

        Gate::authorize('viewParticipants', $atelier);

        return response()->json([
            'data' => $this->atelierService->getParticipants($atelier),
        ]);
    }
}
