import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Ingresos', href: '/incomes' },
    { title: 'Nuevo Ingreso', href: '/incomes/create' },
];

interface TypeOption {
    value: string;
    label: string;
}

interface CreateIncomeProps extends SharedData {
    types: TypeOption[];
    [key: string]: unknown;
}



export default function CreateIncome() {
    const { types } = usePage<CreateIncomeProps>().props;
    
    const { data, setData, post, processing, errors } = useForm({
        description: '',
        amount: '',
        type: '',
        invoice_number: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('incomes.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Ingreso" />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-2xl">💰</span>
                        <h1 className="text-2xl font-bold">Registrar Nuevo Ingreso</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Description */}
                            <div className="md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                    Descripción *
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Ej: Venta de productos Q1 2024"
                                    required
                                />
                                {errors.description && (
                                    <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            {/* Amount */}
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                    Monto *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        id="amount"
                                        step="0.01"
                                        min="0"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-8 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                {errors.amount && (
                                    <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
                                )}
                            </div>

                            {/* Type */}
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                    Tipo de Ingreso *
                                </label>
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Seleccionar tipo</option>
                                    {types.map((typeOption) => (
                                        <option key={typeOption.value} value={typeOption.value}>
                                            {typeOption.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.type && (
                                    <p className="text-red-600 text-sm mt-1">{errors.type}</p>
                                )}
                            </div>

                            {/* Invoice Number */}
                            <div>
                                <label htmlFor="invoice_number" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                    Número de Factura/Referencia
                                </label>
                                <input
                                    type="text"
                                    id="invoice_number"
                                    value={data.invoice_number}
                                    onChange={(e) => setData('invoice_number', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Ej: INV-2024-001"
                                />
                                {errors.invoice_number && (
                                    <p className="text-red-600 text-sm mt-1">{errors.invoice_number}</p>
                                )}
                            </div>

                            {/* Date */}
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                    Fecha *
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                {errors.date && (
                                    <p className="text-red-600 text-sm mt-1">{errors.date}</p>
                                )}
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                Notas Adicionales
                            </label>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="Información adicional sobre este ingreso..."
                            />
                            {errors.notes && (
                                <p className="text-red-600 text-sm mt-1">{errors.notes}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700 min-w-32"
                            >
                                {processing ? 'Guardando...' : '💾 Guardar Ingreso'}
                            </Button>
                            <Link href={route('incomes.index')}>
                                <Button type="button" variant="outline">
                                    ❌ Cancelar
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}