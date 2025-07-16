import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import CompanyLayout from '@/Components/CompanyLayout';
import GeminiChatBot from '@/Components/GeminiChatBot';

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
    const [isVisible, setIsVisible] = useState(false);

    // Trigger visibility animations
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <CompanyLayout>
            <Head title="Kelas - Warung Pasinaon" />

            {/* Simplified background - only on desktop */}
            <div className="hidden lg:block fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-1000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
            </div>

            <div className="min-h-screen bg-white">
                {/* Shadow below navbar */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent shadow-sm"></div>
                
                {/* Header Section */}
                <section className="pt-14">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className={`text-center mb-12 transition-all duration-700 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <div className={`transition-all duration-600 delay-200 ${
                                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            }`}>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    Kelas Warung Pasinaon
                                </h1>
                            </div>
                            
                            <p className={`text-gray-600 text-base mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-600 delay-300 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                                Dokumentasi berbagai kelas pembelajaran dan pengembangan yang telah kami 
                                selenggarakan untuk kemajuan pendidikan
                            </p>
                        </div>
                    </div>
                </section>

                {/* Classes Grid */}
                <section className="pb-20">
                    <div className="max-w-4xl mx-auto px-6">
                        {kelas.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {kelas.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:scale-105 hover:-translate-y-2 animate-fade-in-up`}
                                        style={{ animationDelay: `${index * 100 + 400}ms` }}
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={item.gambar ? item.gambar : "/api/placeholder/400/240"}
                                                alt={item.nama}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            
                                            {/* Category Badge */}
                                            <div className={`absolute top-4 left-4 animate-fade-in-up`}
                                                style={{ animationDelay: `${index * 100 + 600}ms` }}>
                                                <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold border border-white/20 hover:scale-110 transition-transform duration-200">
                                                    {item.kategori}
                                                </span>
                                            </div>
                                            
                                            {/* GRATIS Badge */}
                                            <div className={`absolute top-4 right-4 animate-fade-in-up`}
                                                style={{ animationDelay: `${index * 100 + 700}ms` }}>
                                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold hover:scale-110 transition-transform duration-200">
                                                    GRATIS
                                                </span>
                                            </div>
                                            
                                            {!item.is_available && (
                                                <div className={`absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm animate-fade-in-up`}
                                                    style={{ animationDelay: `${index * 100 + 800}ms` }}>
                                                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold animate-bounce-slow">
                                                        Tidak Tersedia
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight uppercase group-hover:text-blue-600 transition-colors duration-200">
                                                {item.nama}
                                            </h3>

                                            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 uppercase">
                                                {item.deskripsi}
                                            </p>

                                            {/* Class Info */}
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <svg 
                                                        className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {item.hari}, {item.tanggal}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <svg 
                                                        className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <span>
                                                        {item.terdaftar}/{item.kapasitas} peserta
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="transform transition-transform duration-200 group-hover:translate-x-1">
                                                <Link
                                                    href={`/kelas/${item.id}`}
                                                    className="inline-flex items-center text-red-500 hover:text-red-600 font-medium text-sm transition-all duration-200 group/link hover:scale-105"
                                                >
                                                    <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                                                        Lihat Detail
                                                    </span>
                                                    <svg 
                                                        className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 animate-fade-in-up">
                                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center animate-bounce-slow">
                                    <svg 
                                        className="w-12 h-12 text-gray-400" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                </div>
                                
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Belum Ada Kelas
                                </h3>
                                
                                <p className="text-gray-600">
                                    Kelas pembelajaran belum tersedia saat ini.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <GeminiChatBot />
        </CompanyLayout>
    );
};

export default Index;