<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInscriptionRequest;
use App\Http\Requests\UpdateInscriptionRequest;
use App\Http\Resources\InscriptionResource;
use App\Models\Atelier;
use App\Models\Inscription;
use App\Services\InscriptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class InscriptionController extends Controller
{
    public function __construct(
        protected InscriptionService $inscriptionService
    ) {}

    // Create inscription
    public function store(StoreInscriptionRequest $request)
    {
        Gate::authorize('create', Inscription::class);

        $inscription = $this->inscriptionService->inscrire(
            $request->user(),
            $request->validated('atelier_id')
        );

        return (new InscriptionResource($inscription))
            ->response()
            ->setStatusCode(201);
    }

    // Get all inscriptions
    public function index()
    {
        Gate::authorize('viewAny', Inscription::class);

        $inscriptions = $this->inscriptionService
            ->toutesLesInscriptions();

        return InscriptionResource::collection($inscriptions);
    }

    // Get my inscriptions
    public function mesInscriptions(Request $request)
    {
        $inscriptions = $this->inscriptionService->mesInscriptions(
            $request->user()
        );

        return InscriptionResource::collection($inscriptions);
    }

    // Get atelier inscriptions
    public function inscriptionsAtelier(int $id)
    {
        $atelier = Atelier::findOrFail($id);

        Gate::authorize('viewAtelierInscriptions', [Inscription::class, $atelier]);

        $inscriptions = $this->inscriptionService
            ->inscriptionsAtelier($atelier);

        return InscriptionResource::collection($inscriptions);
    }

    // Update inscription status
    public function updateStatus(
        UpdateInscriptionRequest $request,
        int $id
    ) {
        $inscription = $this->inscriptionService->getById($id);

        Gate::authorize('updateStatus', $inscription);

        $inscription = $this->inscriptionService->updateStatus(
            $inscription,
            $request->validated('statut')
        );

        return new InscriptionResource($inscription);
    }

    // Cancel inscription
    public function annuler(Request $request, int $id)
    {
        $inscription = $this->inscriptionService->getById($id);

        Gate::authorize('cancel', $inscription);

        $inscription = $this->inscriptionService->annuler(
            $inscription
        );

        return response()->json([
            'message' => 'Inscription annulée avec succès',
            'data' => new InscriptionResource($inscription),
        ]);
    }
}
