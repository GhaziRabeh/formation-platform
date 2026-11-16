<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
            ->constrained('users')
            ->cascadeOnDelete();

            $table->foreignId('atelier_id')
            ->constrained('ateliers')
            ->cascadeOnDelete();

            $table->enum('statut', ['en_attente', 'confirmee', 'annulee'])->default('en_attente');
            $table->dateTime('date_inscription')->useCurrent();
            $table->timestamps();
            $table->unique(['user_id', 'atelier_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};
