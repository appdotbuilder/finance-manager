<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\Income;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FinancialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create test users with different roles
        $ceo = User::create([
            'name' => 'CEO Ejemplo',
            'email' => 'ceo@empresa.com',
            'password' => Hash::make('password'),
            'role' => 'ceo',
            'company_name' => 'Empresa Ejemplo S.A.',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $contador = User::create([
            'name' => 'Contador Principal',
            'email' => 'contador@empresa.com',
            'password' => Hash::make('password'),
            'role' => 'contador',
            'company_name' => 'Empresa Ejemplo S.A.',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $admin = User::create([
            'name' => 'Administrativo General',
            'email' => 'admin@empresa.com',
            'password' => Hash::make('password'),
            'role' => 'administrativo',
            'company_name' => 'Empresa Ejemplo S.A.',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create sample incomes
        Income::create([
            'description' => 'Venta de productos Q1',
            'amount' => 15000.00,
            'type' => 'venta',
            'invoice_number' => 'INV-2024-001',
            'date' => now()->subDays(5),
            'notes' => 'Venta trimestral de productos principales',
            'user_id' => $contador->id,
        ]);

        Income::create([
            'description' => 'Facturación servicios consultoría',
            'amount' => 8500.00,
            'type' => 'factura',
            'invoice_number' => 'FAC-2024-012',
            'date' => now()->subDays(10),
            'notes' => 'Servicios de consultoría empresarial',
            'user_id' => $admin->id,
        ]);

        Income::create([
            'description' => 'Ingresos por inversiones',
            'amount' => 3200.00,
            'type' => 'otros',
            'date' => now()->subDays(15),
            'notes' => 'Rendimientos de inversiones financieras',
            'user_id' => $ceo->id,
        ]);

        // Create sample expenses
        Expense::create([
            'description' => 'Salarios equipo desarrollo',
            'amount' => 12000.00,
            'type' => 'nominas',
            'reference_number' => 'NOM-2024-01',
            'date' => now()->subDays(3),
            'notes' => 'Nómina mensual equipo de desarrollo',
            'user_id' => $admin->id,
        ]);

        Expense::create([
            'description' => 'Compra equipos de oficina',
            'amount' => 4500.00,
            'type' => 'compras',
            'reference_number' => 'COMP-2024-045',
            'date' => now()->subDays(7),
            'notes' => 'Computadoras y mobiliario de oficina',
            'user_id' => $contador->id,
        ]);

        Expense::create([
            'description' => 'Gastos operativos mensuales',
            'amount' => 2800.00,
            'type' => 'costos_operativos',
            'reference_number' => 'OP-2024-12',
            'date' => now()->subDays(12),
            'notes' => 'Electricidad, internet, servicios básicos',
            'user_id' => $admin->id,
        ]);

        // Create additional sample data
        Income::factory()->count(20)->create([
            'user_id' => fake()->randomElement([$ceo->id, $contador->id, $admin->id]),
        ]);

        Expense::factory()->count(25)->create([
            'user_id' => fake()->randomElement([$ceo->id, $contador->id, $admin->id]),
        ]);
    }
}