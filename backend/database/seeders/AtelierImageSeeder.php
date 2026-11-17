<?php

namespace Database\Seeders;

use App\Models\Atelier;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class AtelierImageSeeder extends Seeder
{
    // Recreate missing seed images
    public function run(): void
    {
        Atelier::where('image', 'like', 'ateliers/seed/%')
            ->get()
            ->reject(fn (Atelier $atelier) => Storage::disk('public')->exists($atelier->image))
            ->each(fn (Atelier $atelier) => AtelierSeeder::createImage($atelier));
    }
}
