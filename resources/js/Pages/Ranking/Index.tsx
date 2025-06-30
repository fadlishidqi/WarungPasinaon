import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

// Definisikan tipe data untuk props
interface Ranking {
    name: string;
    total_points: number;
}
interface Props {
    rankings: Ranking[];
    successMessage?: string;
}

export default function Index({ rankings, successMessage }: Props) {
    return (
        <GuestLayout>
            <Head title="Peringkat Harian" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">🏆 Peringkat 10 Besar Hari Ini 🏆</h2>
                    <p className="mt-2 text-sm text-gray-600">Poin direset setiap hari. Terus kunjungi WarungPasinaon!</p>
                </div>
                
                {successMessage && (
                    <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}

                <div className="bg-white shadow-sm sm:rounded-lg">
                    <ul role="list" className="divide-y divide-gray-200">
                        {rankings.length > 0 ? (
                            rankings.map((rank, index) => (
                                <li key={index} className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                                            {index + 1}
                                        </span>
                                        <p className="ml-4 text-sm font-medium text-gray-900">{rank.name}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">
                                        {rank.total_points} Poin
                                    </p>
                                </li>
                            ))
                        ) : (
                            <li className="px-6 py-4 text-center text-gray-500">
                                Belum ada peringkat untuk hari ini. Ayo jadi yang pertama!
                            </li>
                        )}
                    </ul>
                </div>
                 <div className="text-center mt-6 flex justify-center gap-4">
                    <Link href={route('attendance.create.anak')} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">
                        Absen (Anak-Anak)
                    </Link>
                    <Link href={route('attendance.create.umum')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">
                        Absen (Umum)
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}