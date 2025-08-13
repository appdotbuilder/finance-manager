<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Expense::with('user')->latest('date');

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

        $expenses = $query->paginate(15)->withQueryString();
        
        return Inertia::render('expenses/index', [
            'expenses' => $expenses,
            'filters' => $request->only(['from_date', 'to_date', 'type']),
            'types' => [
                ['value' => 'costos_operativos', 'label' => 'Costos Operativos'],
                ['value' => 'compras', 'label' => 'Compras'],
                ['value' => 'nominas', 'label' => 'Nóminas'],
                ['value' => 'otros', 'label' => 'Otros'],
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('expenses/create', [
            'types' => [
                ['value' => 'costos_operativos', 'label' => 'Costos Operativos'],
                ['value' => 'compras', 'label' => 'Compras'],
                ['value' => 'nominas', 'label' => 'Nóminas'],
                ['value' => 'otros', 'label' => 'Otros'],
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpenseRequest $request)
    {
        $expense = Expense::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('expenses.show', $expense)
            ->with('success', 'Gasto registrado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        // Check if user can view this expense
        if (!auth()->user()->canManageAll() && $expense->user_id !== auth()->id()) {
            abort(403);
        }

        $expense->load('user');

        return Inertia::render('expenses/show', [
            'expense' => $expense
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        // Check if user can edit this expense
        if (!auth()->user()->canManageAll() && $expense->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('expenses/edit', [
            'expense' => $expense,
            'types' => [
                ['value' => 'costos_operativos', 'label' => 'Costos Operativos'],
                ['value' => 'compras', 'label' => 'Compras'],
                ['value' => 'nominas', 'label' => 'Nóminas'],
                ['value' => 'otros', 'label' => 'Otros'],
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        // Check if user can update this expense
        if (!auth()->user()->canManageAll() && $expense->user_id !== auth()->id()) {
            abort(403);
        }

        $expense->update($request->validated());

        return redirect()->route('expenses.show', $expense)
            ->with('success', 'Gasto actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        // Check if user can delete this expense
        if (!auth()->user()->canManageAll() && $expense->user_id !== auth()->id()) {
            abort(403);
        }

        $expense->delete();

        return redirect()->route('expenses.index')
            ->with('success', 'Gasto eliminado exitosamente.');
    }
}