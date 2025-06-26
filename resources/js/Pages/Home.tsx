import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Home({ auth }: PageProps) {
    return (
        <>
            <Head title="Warung Pasinaon" />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Selamat datang
                                    <br />
                                    di Warung{' '}
                                    <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                                        Pasinaon!
                                    </span>
                                </h1>
                                
                                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                                    Warung Pasinaon adalah platform pembelajaran digital yang menyediakan berbagai konten edukatif untuk mendukung proses belajar mengajar.
                                </p>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 gap-4 pt-8">
                                <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-sm">Platform</h3>
                                    <p className="text-xs text-gray-600 mt-1">Digital</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-sm">1000+ Siswa</h3>
                                    <p className="text-xs text-gray-600 mt-1">Aktif</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-sm">95% Rating</h3>
                                    <p className="text-xs text-gray-600 mt-1">Kepuasan</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Image Grid */}
                        <div className="space-y-4">
                            {/* Top Image */}
                            <div className="rounded-3xl overflow-hidden shadow-lg">
                                <img 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                                    alt="Kegiatan Belajar"
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                            
                            {/* Bottom Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-3xl overflow-hidden shadow-lg">
                                    <img 
                                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
                                        alt="Diskusi Kelompok"
                                        className="w-full h-40 object-cover"
                                    />
                                </div>
                                <div className="rounded-3xl overflow-hidden shadow-lg">
                                    <img 
                                        src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
                                        alt="Digital Learning"
                                        className="w-full h-40 object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}