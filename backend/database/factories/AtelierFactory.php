<?php

namespace Database\Factories;

use App\Models\Atelier;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AtelierFactory extends Factory
{
    protected $model = Atelier::class;

    private const TITLES = [
        'Introduction à Laravel',
        'Angular pour débutants',
        'Bases de données MySQL',
        'Git et GitHub en équipe',
        'API REST avec Laravel',
        'TypeScript avancé',
        'Docker pour développeurs',
        'Tests unitaires avec PHPUnit',
        'UX Design : les fondamentaux',
        'Gestion de projet Agile Scrum',
        'Python pour l\'analyse de données',
        'Sécurité des applications web',
        'Tailwind CSS en pratique',
        'Communication professionnelle',
        'Excel avancé',
        'Initiation au Machine Learning',
        'Déploiement continu (CI/CD)',
        'Prise de parole en public',
    ];

    private const LIEUX = [
        'Salle A - Tunis',
        'Salle B - Tunis',
        'Salle de conférence - Sousse',
        'Campus - Sfax',
        'Espace Coworking - Ariana',
        'En ligne (Google Meet)',
        'En ligne (Zoom)',
    ];

    public function definition(): array
    {
        $faker = fake('fr_FR');

        $debut = $faker->dateTimeBetween('+3 days', '+60 days');
        $debut->setTime($faker->randomElement([9, 10, 14]), 0);

        return [
            'title' => $faker->randomElement(self::TITLES),
            'description' => $faker->realText(200),
            'lieu' => $faker->randomElement(self::LIEUX),
            'image' => null,
            'date_debut' => $debut,
            'date_fin' => (clone $debut)->modify('+'.$faker->numberBetween(2, 8).' hours'),
            'capacite' => $faker->randomElement([8, 10, 12, 15, 20, 25]),
            'statut' => 'planifie',
            'formateur_id' => User::factory()->formateur(),
        ];
    }

    // Planned atelier
    public function planifie(): static
    {
        return $this->state(fn () => ['statut' => 'planifie']);
    }

    // Running atelier
    public function enCours(): static
    {
        return $this->state(fn () => [
            'statut' => 'en_cours',
            'date_debut' => fake()->dateTimeBetween('-2 days', '-1 hour'),
            'date_fin' => fake()->dateTimeBetween('+2 hours', '+3 days'),
        ]);
    }

    // Finished atelier
    public function termine(): static
    {
        return $this->state(function () {
            $debut = fake()->dateTimeBetween('-90 days', '-5 days');

            return [
                'statut' => 'termine',
                'date_debut' => $debut,
                'date_fin' => (clone $debut)->modify('+'.fake()->numberBetween(2, 8).' hours'),
            ];
        });
    }

    // Cancelled atelier
    public function annule(): static
    {
        return $this->state(fn () => ['statut' => 'annule']);
    }
}
