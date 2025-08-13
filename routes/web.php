<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ReportsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Income management
    Route::resource('incomes', IncomeController::class);
    
    // Expense management
    Route::resource('expenses', ExpenseController::class);
    
    // Financial reports
    Route::get('reports', [ReportsController::class, 'index'])->name('reports.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
