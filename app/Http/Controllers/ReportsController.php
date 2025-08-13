<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Income;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportsController extends Controller
{
    /**
     * Display financial reports.
     */
    public function index(Request $request)
    {
        $request->validate([
            'period' => 'nullable|in:this_month,last_month,this_year,last_year,custom',
            'from_date' => 'nullable|date',
            'to_date' => 'nullable|date|after_or_equal:from_date',
        ]);

        $period = $request->get('period', 'this_month');
        $fromDate = null;
        $toDate = null;

        // Set date ranges based on period
        switch ($period) {
            case 'this_month':
                $fromDate = now()->startOfMonth();
                $toDate = now()->endOfMonth();
                break;
            case 'last_month':
                $fromDate = now()->subMonth()->startOfMonth();
                $toDate = now()->subMonth()->endOfMonth();
                break;
            case 'this_year':
                $fromDate = now()->startOfYear();
                $toDate = now()->endOfYear();
                break;
            case 'last_year':
                $fromDate = now()->subYear()->startOfYear();
                $toDate = now()->subYear()->endOfYear();
                break;
            case 'custom':
                $fromDate = $request->from_date ? Carbon::parse($request->from_date) : now()->startOfMonth();
                $toDate = $request->to_date ? Carbon::parse($request->to_date) : now()->endOfMonth();
                break;
        }

        // Build queries based on user permissions
        $incomeQuery = Income::whereBetween('date', [$fromDate, $toDate]);
        $expenseQuery = Expense::whereBetween('date', [$fromDate, $toDate]);

        if (!auth()->user()->canManageAll()) {
            $incomeQuery->where('user_id', auth()->id());
            $expenseQuery->where('user_id', auth()->id());
        }

        // Calculate totals
        $totalIncome = $incomeQuery->sum('amount');
        $totalExpenses = $expenseQuery->sum('amount');
        $profit = $totalIncome - $totalExpenses;

        // Get income by type
        $incomeByType = Income::selectRaw('type, SUM(amount) as total')
            ->whereBetween('date', [$fromDate, $toDate])
            ->when(!auth()->user()->canManageAll(), function ($query) {
                return $query->where('user_id', auth()->id());
            })
            ->groupBy('type')
            ->get()
            ->map(function ($item) {
                return [
                    'type' => $item->type,
                    'type_display' => match($item->type) {
                        'venta' => 'Ventas',
                        'factura' => 'Facturas',
                        'otros' => 'Otros',
                        default => ucfirst($item->type),
                    },
                    'total' => $item->getAttribute('total'),
                ];
            });

        // Get expenses by type
        $expensesByType = Expense::selectRaw('type, SUM(amount) as total')
            ->whereBetween('date', [$fromDate, $toDate])
            ->when(!auth()->user()->canManageAll(), function ($query) {
                return $query->where('user_id', auth()->id());
            })
            ->groupBy('type')
            ->get()
            ->map(function ($item) {
                return [
                    'type' => $item->type,
                    'type_display' => match($item->type) {
                        'costos_operativos' => 'Costos Operativos',
                        'compras' => 'Compras',
                        'nominas' => 'Nóminas',
                        'otros' => 'Otros',
                        default => ucfirst($item->type),
                    },
                    'total' => $item->getAttribute('total'),
                ];
            });

        // Get monthly trend for current year
        $monthlyTrend = collect(range(1, 12))->map(function ($month) {
            $monthStart = now()->year(now()->year)->month($month)->startOfMonth();
            $monthEnd = now()->year(now()->year)->month($month)->endOfMonth();
            
            $incomeQuery = Income::whereBetween('date', [$monthStart, $monthEnd]);
            $expenseQuery = Expense::whereBetween('date', [$monthStart, $monthEnd]);
            
            if (!auth()->user()->canManageAll()) {
                $incomeQuery->where('user_id', auth()->id());
                $expenseQuery->where('user_id', auth()->id());
            }
            
            $income = $incomeQuery->sum('amount') ?: 0;
            $expenses = $expenseQuery->sum('amount') ?: 0;
            
            return [
                'month' => $monthStart->format('M'),
                'income' => $income,
                'expenses' => $expenses,
                'profit' => $income - $expenses,
            ];
        });

        return Inertia::render('reports/index', [
            'summary' => [
                'total_income' => $totalIncome,
                'total_expenses' => $totalExpenses,
                'profit' => $profit,
                'period_display' => $this->getPeriodDisplay($period, $fromDate, $toDate),
            ],
            'income_by_type' => $incomeByType,
            'expenses_by_type' => $expensesByType,
            'monthly_trend' => $monthlyTrend,
            'filters' => [
                'period' => $period,
                'from_date' => $fromDate?->format('Y-m-d'),
                'to_date' => $toDate?->format('Y-m-d'),
            ],
            'period_options' => [
                ['value' => 'this_month', 'label' => 'Este Mes'],
                ['value' => 'last_month', 'label' => 'Mes Anterior'],
                ['value' => 'this_year', 'label' => 'Este Año'],
                ['value' => 'last_year', 'label' => 'Año Anterior'],
                ['value' => 'custom', 'label' => 'Personalizado'],
            ]
        ]);
    }

    /**
     * Get period display name.
     *
     * @param string $period
     * @param Carbon|null $fromDate
     * @param Carbon|null $toDate
     * @return string
     */
    protected function getPeriodDisplay(string $period, ?Carbon $fromDate, ?Carbon $toDate): string
    {
        return match($period) {
            'this_month' => 'Este Mes (' . now()->format('M Y') . ')',
            'last_month' => 'Mes Anterior (' . now()->subMonth()->format('M Y') . ')',
            'this_year' => 'Este Año (' . now()->year . ')',
            'last_year' => 'Año Anterior (' . now()->subYear()->year . ')',
            'custom' => 'Del ' . $fromDate?->format('d/m/Y') . ' al ' . $toDate?->format('d/m/Y'),
            default => 'Período Personalizado',
        };
    }
}