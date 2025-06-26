import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Home({ auth }: PageProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Data untuk carousel dokumentasi
    const documentationImages = [
        {
            id: 1,
            title: "Green Finance National Pipeline",
            description: "Greenway tampil di Harian Kompas sebagai salah satu inisiatif hijau terdepan yang diajak oleh mahasiswa Indonesia. Program ini mendapat sorotan karena mengurusi perekonomian kolaboratif dalam mendorong pembiayaan hijau dan pemberdayaan generasi muda untuk menciptakan solusi berkelanjutan di berbagai sektor.",
            image: "/api/placeholder/800/400"
        },
        {
            id: 2,
            title: "Workshop Digital Learning",
            description: "Workshop pengembangan konten digital yang diselenggarakan untuk meningkatkan kualitas pembelajaran online. Kegiatan ini melibatkan para pendidik dan teknisi untuk menciptakan materi pembelajaran yang lebih interaktif dan engaging.",
            image: "/api/placeholder/800/400"
        },
        {
            id: 3,
            title: "Community Gathering",
            description: "Pertemuan komunitas Warung Pasinaon yang mempertemukan para pendidik, siswa, dan stakeholder pendidikan. Event ini menjadi wadah sharing knowledge dan networking untuk kemajuan pendidikan digital Indonesia.",
            image: "/api/placeholder/800/400"
        },
        {
            id: 4,
            title: "Achievement Awards",
            description: "Penghargaan prestasi platform pembelajaran yang diterima atas kontribusi dalam dunia pendidikan digital. Recognition ini memotivasi tim untuk terus berinovasi dalam menghadirkan solusi pembelajaran terbaik.",
            image: "/api/placeholder/800/400"
        }
    ];

    // Auto slide effect setiap 3 detik
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => 
                prevSlide === documentationImages.length - 1 ? 0 : prevSlide + 1
            );
        }, 3000);

        return () => clearInterval(timer);
    }, [documentationImages.length]);

    const goToSlide = (slideIndex: React.SetStateAction<number>) => {
        setCurrentSlide(slideIndex);
    };

    const goToPrevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? documentationImages.length - 1 : currentSlide - 1);
    };

    const goToNextSlide = () => {
        setCurrentSlide(currentSlide === documentationImages.length - 1 ? 0 : currentSlide + 1);
    };

    return (
        <>
            <Head title="Warung Pasinaon" />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                {/* Hero Section - TIDAK DIUBAH */}
                <section id="home">
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

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-pink-500 hover:to-red-500 transition duration-300 transform hover:scale-105 shadow-lg">
                                        Mulai Belajar
                                    </button>
                                    <button 
                                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300"
                                    >
                                        Tentang Kami
                                    </button>
                                </div>
                            </div>

                            {/* Right Content - Image Grid - TIDAK DIUBAH */}
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
                </section>

                {/* About Section - BARU DITAMBAHKAN */}
                <section id="about" className="bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                        {/* About Hero */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                            {/* Left Content */}
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                        Tentang{' '}
                                        <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                                            Warung Pasinaon
                                        </span>
                                    </h2>
                                    
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Warung Pasinaon adalah platform pembelajaran digital yang didedikasikan untuk menyediakan akses pendidikan berkualitas bagi semua kalangan. Kami berkomitmen menghadirkan inovasi dalam dunia pendidikan Indonesia melalui teknologi dan konten pembelajaran yang interaktif.
                                    </p>

                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Dengan pengalaman bertahun-tahun di bidang pendidikan, kami memahami kebutuhan pembelajaran modern yang efektif dan menyenangkan. Platform kami dirancang untuk memfasilitasi proses belajar mengajar yang lebih engaging dan hasil yang optimal.
                                    </p>
                                </div>
                            </div>

                            {/* Right Content - Stats */}
                            <div className="relative">
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl h-96 flex items-center justify-center shadow-xl overflow-hidden">
                                    <div className="relative">
                                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                                            <div className="flex items-center space-x-4 mb-6">
                                                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">Warung Pasinaon</h3>
                                                    <p className="text-gray-600">Platform Pembelajaran Digital</p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Konten Pembelajaran</span>
                                                    <span className="text-sm font-semibold text-gray-900">1000+</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Pengguna Aktif</span>
                                                    <span className="text-sm font-semibold text-gray-900">5000+</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Rating</span>
                                                    <div className="flex items-center">
                                                        <span className="text-sm font-semibold text-gray-900">4.8</span>
                                                        <div className="flex ml-2">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visi & Misi Section */}
                        <div className="grid md:grid-cols-2 gap-12 mb-20">
                            {/* Visi */}
                            <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 shadow-xl">
                                <div className="space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900">Visi Kami</h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Menjadi platform pembelajaran digital terdepan yang memberikan akses pendidikan berkualitas untuk semua kalangan, menciptakan generasi yang cerdas, kreatif, dan berkarakter untuk masa depan Indonesia yang lebih baik.
                                    </p>
                                </div>
                            </div>

                            {/* Misi */}
                            <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 shadow-xl">
                                <div className="space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900">Misi Kami</h3>
                                    <ul className="space-y-3 text-lg text-gray-600">
                                        <li className="flex items-start">
                                            <div className="bg-gradient-to-r from-pink-400 to-red-400 rounded-full w-2 h-2 mt-3 mr-4 flex-shrink-0"></div>
                                            Menyediakan konten pembelajaran digital yang interaktif dan mudah diakses
                                        </li>
                                        <li className="flex items-start">
                                            <div className="bg-gradient-to-r from-pink-400 to-red-400 rounded-full w-2 h-2 mt-3 mr-4 flex-shrink-0"></div>
                                            Mengembangkan teknologi pendidikan yang inovatif dan user-friendly
                                        </li>
                                        <li className="flex items-start">
                                            <div className="bg-gradient-to-r from-pink-400 to-red-400 rounded-full w-2 h-2 mt-3 mr-4 flex-shrink-0"></div>
                                            Memfasilitasi kolaborasi antara pendidik dan peserta didik
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Documentation Carousel */}
                        <div className="space-y-8">
                            <div className="text-center">
                                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                                    Dokumentasi Kegiatan
                                </h3>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Momen-momen penting dalam perjalanan Warung Pasinaon
                                </p>
                            </div>

                            {/* Carousel Container */}
                            <div className="relative max-w-5xl mx-auto">
                                <div className="relative h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                                    {documentationImages.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        >
                                            {/* Background Image dengan Overlay */}
                                            <div className="relative w-full h-full">
                                                {/* Placeholder untuk gambar */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400">
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
                                                        <div className="text-center text-gray-600">
                                                            <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                                                            </svg>
                                                            <p className="text-sm font-medium">Dokumentasi {item.title}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Dark Overlay */}
                                                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                                                
                                                {/* Content Overlay */}
                                                <div className="absolute inset-0 flex items-end">
                                                    <div className="w-full p-8 md:p-12 text-white">
                                                        <div className="max-w-3xl">
                                                            <h4 className="text-2xl md:text-3xl font-bold mb-4">
                                                                {item.title}
                                                            </h4>
                                                            <p className="text-lg md:text-xl leading-relaxed opacity-90">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={goToPrevSlide}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                                    </svg>
                                </button>
                                
                                <button
                                    onClick={goToNextSlide}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                    </svg>
                                </button>

                                {/* Carousel Indicators */}
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                                    {documentationImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                index === currentSlide 
                                                    ? 'bg-white scale-125' 
                                                    : 'bg-white/50 hover:bg-white/75'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}