import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    role_display_name: string;
    company_name?: string;
    [key: string]: unknown;
}

interface Income {
    id: number;
    description: string;
    amount: number;
    type: string;
    type_display_name: string;
    date: string;
    user: User;
    [key: string]: unknown;
}

interface Expense {
    id: number;
    description: string;
    amount: number;
    type: string;
    type_display_name: string;
    date: string;
    user: User;
    [key: string]: unknown;
}

interface Stats {
    this_month_income: number;
    this_month_expenses: number;
    this_month_profit: number;
    this_year_income: number;
    this_year_expenses: number;
    this_year_profit: number;
    total_records: number;
}

interface DashboardProps extends SharedData {
    user: User;
    stats: Stats;
    recent_incomes: Income[];
    recent_expenses: Expense[];
    [key: string]: unknown;
}

export default function Dashboard() {
    const { user, stats, recent_incomes, recent_expenses } = usePage<DashboardProps>().props;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Financiero" />
            
            <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        ¡Bienvenido, {user.name}! 👋
                    </h1>
                    <p className="text-blue-100">
                        {user.role_display_name} • {user.company_name || 'Sistema Financiero'}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Ingresos Este Mes
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(stats.this_month_income)}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center dark:bg-green-900">
                                <span className="text-2xl">📈</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Gastos Este Mes
                                </p>
                                <p className="text-2xl font-bold text-red-600">
                                    {formatCurrency(stats.this_month_expenses)}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center dark:bg-red-900">
                                <span className="text-2xl">📉</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Ganancia Este Mes
                                </p>
                                <p className={`text-2xl font-bold ${stats.this_month_profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatCurrency(stats.this_month_profit)}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Registros
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {stats.total_records}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center dark:bg-purple-900">
                                <span className="text-2xl">📊</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                    <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href={route('incomes.create')}
                            className="flex items-center gap-3 p-4 rounded-lg border border-green-200 hover:bg-green-50 transition-colors dark:border-green-800 dark:hover:bg-green-900/20"
                        >
                            <span className="text-2xl">💰</span>
                            <div>
                                <p className="font-medium text-green-700 dark:text-green-400">Nuevo Ingreso</p>
                                <p className="text-sm text-green-600 dark:text-green-500">Registrar venta o factura</p>
                            </div>
                        </Link>

                        <Link
                            href={route('expenses.create')}
                            className="flex items-center gap-3 p-4 rounded-lg border border-red-200 hover:bg-red-50 transition-colors dark:border-red-800 dark:hover:bg-red-900/20"
                        >
                            <span className="text-2xl">📉</span>
                            <div>
                                <p className="font-medium text-red-700 dark:text-red-400">Nuevo Gasto</p>
                                <p className="text-sm text-red-600 dark:text-red-500">Registrar gasto o compra</p>
                            </div>
                        </Link>

                        <Link
                            href={route('reports.index')}
                            className="flex items-center gap-3 p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors dark:border-blue-800 dark:hover:bg-blue-900/20"
                        >
                            <span className="text-2xl">📊</span>
                            <div>
                                <p className="font-medium text-blue-700 dark:text-blue-400">Ver Reportes</p>
                                <p className="text-sm text-blue-600 dark:text-blue-500">Análisis financiero</p>
                            </div>
                        </Link>

                        <Link
                            href={route('incomes.index')}
                            className="flex items-center gap-3 p-4 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors dark:border-purple-800 dark:hover:bg-purple-900/20"
                        >
                            <span className="text-2xl">📋</span>
                            <div>
                                <p className="font-medium text-purple-700 dark:text-purple-400">Ver Registros</p>
                                <p className="text-sm text-purple-600 dark:text-purple-500">Historial completo</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Incomes */}
                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Ingresos Recientes</h3>
                            <Link
                                href={route('incomes.index')}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Ver todos →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recent_incomes.length > 0 ? (
                                recent_incomes.map((income) => (
                                    <div key={income.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                                        <div>
                                            <p className="font-medium text-sm">{income.description}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {income.type_display_name} • {income.date} • {income.user.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">
                                                {formatCurrency(income.amount)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No hay ingresos recientes</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Expenses */}
                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Gastos Recientes</h3>
                            <Link
                                href={route('expenses.index')}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Ver todos →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recent_expenses.length > 0 ? (
                                recent_expenses.map((expense) => (
                                    <div key={expense.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg dark:bg-red-900/20">
                                        <div>
                                            <p className="font-medium text-sm">{expense.description}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {expense.type_display_name} • {expense.date} • {expense.user.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-red-600">
                                                {formatCurrency(expense.amount)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No hay gastos recientes</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Year Summary */}
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                    <h3 className="text-lg font-semibold mb-4">Resumen Anual {new Date().getFullYear()}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Ingresos Totales</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {formatCurrency(stats.this_year_income)}
                            </p>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg dark:bg-red-900/20">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Gastos Totales</p>
                            <p className="text-2xl font-bold text-red-600 mt-1">
                                {formatCurrency(stats.this_year_expenses)}
                            </p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Ganancia Neta</p>
                            <p className={`text-2xl font-bold mt-1 ${stats.this_year_profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(stats.this_year_profit)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}