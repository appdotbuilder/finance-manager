<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Income;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Build queries based on user permissions
        $incomeQuery = Income::query();
        $expenseQuery = Expense::query();

        if (!$user->canManageAll()) {
            $incomeQuery->where('user_id', $user->id);
            $expenseQuery->where('user_id', $user->id);
        }

        // This month statistics
        $thisMonthIncome = (clone $incomeQuery)->thisMonth()->sum('amount');
        $thisMonthExpenses = (clone $expenseQuery)->thisMonth()->sum('amount');
        $thisMonthProfit = $thisMonthIncome - $thisMonthExpenses;

        // This year statistics
        $thisYearIncome = (clone $incomeQuery)->thisYear()->sum('amount');
        $thisYearExpenses = (clone $expenseQuery)->thisYear()->sum('amount');
        $thisYearProfit = $thisYearIncome - $thisYearExpenses;

        // Recent transactions
        $recentIncomes = (clone $incomeQuery)->with('user')
            ->latest('date')
            ->take(5)
            ->get();
            
        $recentExpenses = (clone $expenseQuery)->with('user')
            ->latest('date')
            ->take(5)
            ->get();

        // Quick stats
        $totalRecords = Income::when(!$user->canManageAll(), function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })->count() +
            Expense::when(!$user->canManageAll(), function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })->count();

        return Inertia::render('dashboard', [
            'user' => $user,
            'stats' => [
                'this_month_income' => $thisMonthIncome,
                'this_month_expenses' => $thisMonthExpenses,
                'this_month_profit' => $thisMonthProfit,
                'this_year_income' => $thisYearIncome,
                'this_year_expenses' => $thisYearExpenses,
                'this_year_profit' => $thisYearProfit,
                'total_records' => $totalRecords,
            ],
            'recent_incomes' => $recentIncomes,
            'recent_expenses' => $recentExpenses,
        ]);
    }
}