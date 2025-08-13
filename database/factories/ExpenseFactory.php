<?php

namespace Database\Factories;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'description' => fake()->sentence(random_int(3, 6)),
            'amount' => fake()->randomFloat(2, 50, 25000),
            'type' => fake()->randomElement(['costos_operativos', 'compras', 'nominas', 'otros']),
            'reference_number' => fake()->optional()->numerify('REF-####'),
            'date' => fake()->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
            'notes' => fake()->optional()->paragraph(2),
            'user_id' => User::factory(),
        ];
    }
}