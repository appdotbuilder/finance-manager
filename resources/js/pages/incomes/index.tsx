import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Ingresos', href: '/incomes' },
];

interface User {
    id: number;
    name: string;
    email: string;
    [key: string]: unknown;
}

interface Income {
    id: number;
    description: string;
    amount: number;
    type: string;
    type_display_name: string;
    invoice_number?: string;
    date: string;
    notes?: string;
    user: User;
    [key: string]: unknown;
}

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface IncomePagination {
    data: Income[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface TypeOption {
    value: string;
    label: string;
}

interface IncomesIndexProps extends SharedData {
    incomes: IncomePagination;
    filters: {
        from_date?: string;
        to_date?: string;
        type?: string;
    };
    types: TypeOption[];
    [key: string]: unknown;
}

export default function IncomesIndex() {
    const { incomes, filters, types } = usePage<IncomesIndexProps>().props;
    const [localFilters, setLocalFilters] = useState(filters);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        }).format(amount);
    };

    const handleFilterChange = (key: string, value: string) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        router.get(route('incomes.index'), localFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({});
        router.get(route('incomes.index'));
    };

    const handleDelete = (income: Income) => {
        if (confirm(`¿Estás seguro de que quieres eliminar el ingreso "${income.description}"?`)) {
            router.delete(route('incomes.destroy', income.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Ingresos" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">📈 Gestión de Ingresos</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Total: {incomes.total} registros
                        </p>
                    </div>
                    <Link href={route('incomes.create')}>
                        <Button className="bg-green-600 hover:bg-green-700">
                            ➕ Nuevo Ingreso
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                                Desde
                            </label>
                            <input
                                type="date"
                                value={localFilters.from_date || ''}
                                onChange={(e) => handleFilterChange('from_date', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                                Hasta
                            </label>
                            <input
                                type="date"
                                value={localFilters.to_date || ''}
                                onChange={(e) => handleFilterChange('to_date', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                                Tipo
                            </label>
                            <select
                                value={localFilters.type || ''}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            >
                                <option value="">Todos los tipos</option>
                                {types.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end gap-2">
                            <Button onClick={applyFilters} size="sm" className="flex-1">
                                Filtrar
                            </Button>
                            <Button onClick={clearFilters} variant="outline" size="sm">
                                Limpiar
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Descripción
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tipo
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Monto
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Usuario
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {incomes.data.length > 0 ? (
                                    incomes.data.map((income) => (
                                        <tr key={income.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                                        {income.description}
                                                    </p>
                                                    {income.invoice_number && (
                                                        <p className="text-sm text-gray-500">
                                                            #{income.invoice_number}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                    {income.type_display_name}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <p className="text-lg font-bold text-green-600">
                                                    {formatCurrency(income.amount)}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 text-gray-900 dark:text-gray-100">
                                                {new Date(income.date).toLocaleDateString('es-MX')}
                                            </td>
                                            <td className="px-4 py-4 text-gray-900 dark:text-gray-100">
                                                {income.user.name}
                                            </td>
                                            <td className="px-4 py-4 text-right space-x-2">
                                                <Link
                                                    href={route('incomes.show', income.id)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Ver
                                                </Link>
                                                <Link
                                                    href={route('incomes.edit', income.id)}
                                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(income)}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                            No se encontraron ingresos
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {incomes.last_page > 1 && (
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Mostrando {((incomes.current_page - 1) * incomes.per_page) + 1} a{' '}
                                    {Math.min(incomes.current_page * incomes.per_page, incomes.total)} de{' '}
                                    {incomes.total} resultados
                                </div>
                                <div className="flex gap-1">
                                    {incomes.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.visit(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 text-sm rounded ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                    ? 'bg-white text-gray-700 hover:bg-gray-50 border'
                                                    : 'text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}