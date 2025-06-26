// resources/js/Pages/Kegiatan/Index.tsx

import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface Kegiatan {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    date: string;
    category: string;
    tags: string[];
}

interface Props extends PageProps {
    kegiatan: Kegiatan[];
    currentCategory: string;
    categoryCounts: {
        literasi: number;
        keagamaan: number;
        kesehatan: number;
        umkm: number;
    };
}

export default function KegiatanIndex({ auth, kegiatan, currentCategory, categoryCounts }: Props) {
    const categories = [
        { key: 'literasi', label: 'Literasi', count: categoryCounts.literasi },
        { key: 'keagamaan', label: 'Keagamaan', count: categoryCounts.keagamaan },
        { key: 'kesehatan', label: 'Kesehatan', count: categoryCounts.kesehatan },
        { key: 'umkm', label: 'UMKM', count: categoryCounts.umkm },
    ];

    const handleCategoryChange = (category: string) => {
        router.get('/kegiatan', { category }, { 
            preserveState: true,
            replace: true 
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title="Kegiatan - Warung Pasinaon" />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                {/* Header Section */}
                <section className="bg-white pt-20 pb-16">
                    <div className="max-w-6xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                                Kegiatan Warung Pasinaon
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Dokumentasi berbagai kegiatan pembelajaran dan pengembangan yang telah kami selenggarakan untuk kemajuan pendidikan
                            </p>
                        </div>

                        {/* Category Navigation */}
                        <div className="flex justify-center mb-12">
                            <nav className="flex space-x-0 bg-gray-100 rounded-xl p-1">
                                {categories.map((category, index) => (
                                    <button
                                        key={category.key}
                                        onClick={() => handleCategoryChange(category.key)}
                                        className={`relative px-8 py-4 font-semibold text-sm transition-all duration-300 ${
                                            index === 0 ? 'rounded-l-lg' : ''
                                        } ${
                                            index === categories.length - 1 ? 'rounded-r-lg' : ''
                                        } ${
                                            currentCategory === category.key
                                                ? 'bg-white text-gray-900 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        {category.label}
                                        {currentCategory === category.key && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-t-full"></div>
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Activities Grid */}
                <section className="pb-20">
                    <div className="max-w-6xl mx-auto px-6 lg:px-8">
                        {kegiatan.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-8">
                                {kegiatan.map((item) => (
                                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                                        <div className="relative overflow-hidden">
                                            <img 
                                                src={item.image ? `/storage/${item.image}` : '/api/placeholder/600/300'} 
                                                alt={item.title}
                                                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        
                                        <div className="p-8">
                                            <div className="mb-4">
                                                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                                                    {categories.find(cat => cat.key === item.category)?.label}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            
                                            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                                                {item.description}
                                            </p>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                    </svg>
                                                    {formatDate(item.date)}
                                                </div>
                                                
                                                <Link 
                                                    href={`/kegiatan/${item.slug}`}
                                                    className="inline-flex items-center text-red-500 hover:text-red-600 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300"
                                                >
                                                    Lihat Detail
                                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Belum Ada Kegiatan
                                </h3>
                                <p className="text-gray-600 text-lg">
                                    Kegiatan untuk kategori {categories.find(cat => cat.key === currentCategory)?.label} belum tersedia.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}