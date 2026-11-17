<?php

namespace Database\Seeders;

use App\Models\Atelier;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class AtelierSeeder extends Seeder
{
    private const IMAGE_DIR = 'ateliers/seed';

    private const COLORS = [
        ['#1d4ed8', '#60a5fa'],
        ['#7c3aed', '#c084fc'],
        ['#047857', '#34d399'],
        ['#b45309', '#fbbf24'],
        ['#be123c', '#fb7185'],
        ['#0f766e', '#2dd4bf'],
        ['#334155', '#94a3b8'],
        ['#4338ca', '#818cf8'],
    ];

    public function run(): void
    {
        $formateurs = User::where('role', 'formateur')->get();

        // Remove old seed images
        Storage::disk('public')->deleteDirectory(self::IMAGE_DIR);

        // Ateliers per status
        $states = [
            'planifie' => 10,
            'enCours' => 3,
            'termine' => 6,
            'annule' => 3,
        ];

        foreach ($states as $state => $count) {
            for ($i = 0; $i < $count; $i++) {
                $atelier = Atelier::factory()
                    ->{$state}()
                    ->create(['formateur_id' => $formateurs->random()->id]);

                $atelier->update(['image' => self::createImage($atelier)]);
            }
        }
    }

    // Create atelier image
    public static function createImage(Atelier $atelier): string
    {
        [$from, $to] = self::COLORS[$atelier->id % count(self::COLORS)];

        $lines = explode("\n", wordwrap($atelier->title, 22, "\n", true));
        $startY = 225 - (count($lines) - 1) * 30;

        $title = '';
        foreach ($lines as $index => $line) {
            $y = $startY + $index * 60;
            $title .= '<text x="60" y="'.$y.'" font-size="48" font-weight="700" fill="#ffffff">'
                .e($line).'</text>';
        }

        $lieu = e($atelier->lieu);

        $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" font-family="Segoe UI, Arial, sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{$from}"/>
      <stop offset="1" stop-color="{$to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#bg)"/>
  <circle cx="700" cy="70" r="160" fill="#ffffff" fill-opacity="0.12"/>
  <circle cx="760" cy="400" r="110" fill="#ffffff" fill-opacity="0.08"/>
  <text x="60" y="80" font-size="22" font-weight="600" fill="#ffffff" fill-opacity="0.8" letter-spacing="3">ATELIER</text>
  {$title}
  <text x="60" y="400" font-size="22" fill="#ffffff" fill-opacity="0.9">{$lieu}</text>
</svg>
SVG;

        $path = self::IMAGE_DIR.'/atelier-'.$atelier->id.'.svg';

        Storage::disk('public')->put($path, $svg);

        return $path;
    }
}
