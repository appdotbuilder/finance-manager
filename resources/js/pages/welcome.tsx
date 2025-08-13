import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistema Financiero Empresarial">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-800 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                <header className="mb-6 w-full max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">💰</span>
                            </div>
                            <span className="font-semibold text-lg">FinanSys</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-blue-700 transition-colors"
                                >
                                    Ir al Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="w-full max-w-6xl">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <div className="mb-6">
                                <span className="inline-block text-6xl mb-4">📊</span>
                                <h1 className="text-4xl font-bold mb-4 lg:text-6xl">
                                    Sistema Financiero 
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Empresarial</span>
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto dark:text-gray-300">
                                    Gestiona los ingresos, gastos y reportes financieros de tu empresa con roles de usuario diferenciados y reportes detallados.
                                </p>
                            </div>
                            
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-blue-700 transform hover:scale-105 transition-all"
                                    >
                                        🚀 Comenzar Gratis
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                                    >
                                        📈 Iniciar Sesión
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 dark:bg-green-900">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Gestión de Ingresos</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Registra ventas, facturas y otros ingresos con detalles completos y seguimiento por fechas.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center mb-4 dark:bg-red-900">
                                    <span className="text-2xl">📉</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Control de Gastos</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Administra costos operativos, compras, nóminas y otros gastos de manera organizada.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 dark:bg-blue-900">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Roles de Usuario</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Sistema con roles diferenciados: Contadores, Administrativos, CEO y CTO.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 dark:bg-purple-900">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Reportes Financieros</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Genera reportes de ingresos, gastos y análisis de ganancia/pérdida automáticamente.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-4 dark:bg-yellow-900">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Dashboard Ejecutivo</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Vista panorámica con métricas clave, tendencias mensuales y estadísticas en tiempo real.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 dark:bg-indigo-900">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Seguridad Avanzada</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Control de acceso basado en roles con permisos granulares para cada tipo de usuario.
                                </p>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl mb-16 dark:bg-gray-800">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold mb-2">¿Por qué elegir nuestro sistema?</h2>
                                <p className="text-gray-600 dark:text-gray-300">Diseñado específicamente para empresas modernas</p>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">✨</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Interfaz Intuitiva</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600 mb-2">⚡</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Procesamiento Rápido</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">📱</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Responsive Design</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-indigo-600 mb-2">🛡️</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Datos Seguros</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white shadow-2xl">
                                <h2 className="text-2xl font-bold mb-4">¿Listo para optimizar tus finanzas?</h2>
                                <p className="text-blue-100 mb-6 text-lg">
                                    Únete a empresas que ya confían en nuestro sistema financiero
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all"
                                >
                                    🎯 Empezar Ahora - Es Gratis
                                </Link>
                            </div>
                        )}
                    </main>
                </div>

                <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Sistema Financiero Empresarial • Desarrollado con ❤️ usando Laravel e Inertia.js</p>
                </footer>
            </div>
        </>
    );
}