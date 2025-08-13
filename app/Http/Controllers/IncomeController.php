<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIncomeRequest;
use App\Http\Requests\UpdateIncomeRequest;
use App\Models\Income;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Income::with('user')->latest('date');

        // Filter by date range if provided
        if ($request->filled('from_date')) {
            $query->whereDate('date', '>=', $request->from_date);
        }
        
        if ($request->filled('to_date')) {
            $query->whereDate('date', '<=', $request->to_date);
        }

        // Filter by type if provided
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // If user is not executive/admin, only show their own records
        if (!auth()->user()->canManageAll()) {
            $query->where('user_id', auth()->id());
        }

        $incomes = $query->paginate(15)->withQueryString();
        
        return Inertia::render('incomes/index', [
            'incomes' => $incomes,
            'filters' => $request->only(['from_date', 'to_date', 'type']),
            'types' => [
                ['value' => 'venta', 'label' => 'Venta'],
                ['value' => 'factura', 'label' => 'Factura'],
                ['value' => 'otros', 'label' => 'Otros'],
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('incomes/create', [
            'types' => [
                ['value' => 'venta', 'label' => 'Venta'],
                ['value' => 'factura', 'label' => 'Factura'],
                ['value' => 'otros', 'label' => 'Otros'],
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIncomeRequest $request)
    {
        $income = Income::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('incomes.show', $income)
            ->with('success', 'Ingreso registrado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Income $income)
    {
        // Check if user can view this income
        if (!auth()->user()->canManageAll() && $income->user_id !== auth()->id()) {
            abort(403);
        }

        $income->load('user');

        return Inertia::render('incomes/show', [
            'income' => $income
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Income $income)
    {
        // Check if user can edit this income
        if (!auth()->user()->canManageAll() && $income->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('incomes/edit', [
            'income' => $income,
            'types' => [
                ['value' => 'venta', 'label' => 'Venta'],
                ['value' => 'factura', 'label' => 'Factura'],
                ['value' => 'otros', 'label' => 'Otros'],
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIncomeRequest $request, Income $income)
    {
        // Check if user can update this income
        if (!auth()->user()->canManageAll() && $income->user_id !== auth()->id()) {
            abort(403);
        }

        $income->update($request->validated());

        return redirect()->route('incomes.show', $income)
            ->with('success', 'Ingreso actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Income $income)
    {
        // Check if user can delete this income
        if (!auth()->user()->canManageAll() && $income->user_id !== auth()->id()) {
            abort(403);
        }

        $income->delete();

        return redirect()->route('incomes.index')
            ->with('success', 'Ingreso eliminado exitosamente.');
    }
}