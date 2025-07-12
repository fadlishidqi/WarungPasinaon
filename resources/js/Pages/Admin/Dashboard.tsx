import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

interface DashboardStats {
    total_kegiatan: number;
    published_kegiatan: number;
    total_kelas: number;
    active_kelas: number;
    total_books: number;
    published_books: number;
    total_attendance: number;
    today_attendance: number;
    total_participants: number;
    children_participants: number;
}

export default function Dashboard({ 
    auth, 
    stats, 
    recent_activities 
}: PageProps<{ 
    stats: DashboardStats; 
    recent_activities: any 
}>) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">K</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-500">Kegiatan</div>
                                        <div className="text-lg font-bold text-gray-900">
                                            {stats.published_kegiatan}/{stats.total_kegiatan}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">C</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-500">Kelas</div>
                                        <div className="text-lg font-bold text-gray-900">
                                            {stats.active_kelas}/{stats.total_kelas}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">B</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-500">Buku</div>
                                        <div className="text-lg font-bold text-gray-900">
                                            {stats.published_books}/{stats.total_books}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">A</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-500">Kehadiran Hari Ini</div>
                                        <div className="text-lg font-bold text-gray-900">
                                            {stats.today_attendance}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Management Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link
                            href={route('admin.kegiatan.index')}
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
                        >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                Kelola Kegiatan
                            </h5>
                            <p className="font-normal text-gray-700">
                                Tambah, edit, dan kelola kegiatan literasi, keagamaan, kesehatan, dan UMKM
                            </p>
                        </Link>

                        <Link
                            href={route('admin.kelas.index')}
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
                        >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                Kelola Kelas
                            </h5>
                            <p className="font-normal text-gray-700">
                                Atur jadwal kelas, kapasitas, dan pendaftaran peserta
                            </p>
                        </Link>

                        <Link
                            href={route('admin.books.index')}
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
                        >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                Kelola Buku Digital
                            </h5>
                            <p className="font-normal text-gray-700">
                                Upload dan kelola koleksi buku digital perpustakaan
                            </p>
                        </Link>

                        <Link
                            href={route('admin.attendance.index')}
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
                        >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                Data Kehadiran
                            </h5>
                            <p className="font-normal text-gray-700">
                                Lihat dan kelola data kehadiran pengunjung perpustakaan
                            </p>
                        </Link>

                        <Link
                            href={route('admin.participants.index')}
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
                        >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                Data Partisipan
                            </h5>
                            <p className="font-normal text-gray-700">
                                Kelola data partisipan dan sistem poin
                            </p>
                        </Link>

                        <Link
                            href={route('ranking.index')}
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
                        >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                Lihat Ranking
                            </h5>
                            <p className="font-normal text-gray-700">
                                Lihat ranking dan statistik partisipan
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}