<?php

namespace Database\Factories;

use App\Models\Income;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Income>
 */
class IncomeFactory extends Factory
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
            'amount' => fake()->randomFloat(2, 100, 50000),
            'type' => fake()->randomElement(['venta', 'factura', 'otros']),
            'invoice_number' => fake()->optional()->numerify('INV-####'),
            'date' => fake()->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
            'notes' => fake()->optional()->paragraph(2),
            'user_id' => User::factory(),
        ];
    }
}