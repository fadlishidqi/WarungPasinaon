import React from 'react';
import { Head, Link } from '@inertiajs/react';
import CompanyLayout from '@/Components/CompanyLayout';

interface Kelas {
    id: number;
    nama: string;
    deskripsi: string;
    gambar: string;
    tanggal: string;
    hari: string;
    kategori: string;
    grup_wa?: string;
    kapasitas: number;
    terdaftar: number;
    is_available: boolean;
}

interface Props {
    kelas: Kelas[];
}

const Index: React.FC<Props> = ({ kelas }) => {
    return (
        <CompanyLayout>
            <Head title="Kelas - Warung Pasinaon" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Kelas Tersedia
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Ikuti berbagai kelas menarik yang kami sediakan untuk meningkatkan skill dan pengetahuan Anda
                        </p>
                    </div>

                    {/* Kelas Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {kelas.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {/* Gambar */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={item.gambar} 
                                        alt={item.nama}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {item.kategori}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            GRATIS
                                        </span>
                                    </div>
                                    {!item.is_available && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                                                Tidak Tersedia
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {item.nama}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {item.deskripsi}
                                    </p>

                                    {/* Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {item.hari}, {item.tanggal}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            {item.terdaftar}/{item.kapasitas} peserta
                                        </div>
                                    </div>

                                    {/* WhatsApp Group Link */}
                                    {item.grup_wa && (
                                        <div className="mb-4">
                                            <a
                                                href={item.grup_wa}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                                                </svg>
                                                Gabung Grup WhatsApp
                                            </a>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <Link
                                        href={`/kelas/${item.id}`}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 text-center block"
                                    >
                                        Lihat Detail & Daftar
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {kelas.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Belum ada kelas tersedia</h3>
                            <p className="mt-2 text-gray-500">Kelas baru akan segera hadir. Pantau terus halaman ini!</p>
                        </div>
                    )}
                </div>
            </div>
        </CompanyLayout>
    );
};

export default Index;