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

    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => 
                prevSlide === documentationImages.length - 1 ? 0 : prevSlide + 1
            );
        }, 4000);

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

                {/* Hero Section */}
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
                                        <span className="relative">
                                            <span className="relative z-10 text-gray-900">Pasinaon!</span>
                                            <span className="absolute -bottom-0.5 left-0 right-0 h-12 bg-gradient-to-r from-pink-200 via-rose-200 to-red-200 rounded-lg transform -rotate-1 -z-0"></span>
                                        </span>
                                    </h1>
                                    
                                    <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                                        TBM Warung Pasinaon bukanlah toko buku atau lembaga profit, melainkan ruang belajar gratis bagi masyarakat. Terletak di Dusun Talun RT 07 RW VII, Bergas Lor, Kecamatan Bergas, Ungaran, tempat ini hadir sebagai wadah pendidikan literasi yang terbuka untuk semua kalangan.
                                    </p>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2">
                                    <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-gray-100">
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 overflow-hidden">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2Flogokabsmg.png?alt=media"
                                                alt="Logo Kabupaten Semarang"
                                                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                            />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">Kabupaten</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-1">Semarang</p>
                                    </div>
                                    
                                    <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-gray-100">
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">TBM</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-1">Taman Baca Masyarakat</p>
                                    </div>
                                    
                                    <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">Literasi</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-1">Pendidikan Digital</p>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link 
                                        href="/buku-digital"
                                        className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-pink-500 hover:to-red-500 transition duration-300 transform hover:scale-105 shadow-lg text-center"
                                    >
                                        Mulai Belajar
                                    </Link>
                                    <button 
                                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300"
                                    >
                                        Tentang Kami
                                    </button>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="space-y-4">
                                {/* Top Image */}
                                <div className="rounded-3xl overflow-hidden shadow-lg">
                                    <img 
                                        src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetPasinaon2.png?alt=media"
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                                
                                {/* Bottom Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-3xl overflow-hidden shadow-lg">
                                        <img 
                                            src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetPasinaon1.png?alt=media" 
                                            alt="Diskusi Kelompok"
                                            className="w-full h-40 object-cover"
                                        />
                                    </div>
                                    <div className="rounded-3xl overflow-hidden shadow-lg">
                                        <img 
                                            src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetPasinaon3.png?alt=media" 
                                            alt="Digital Learning"
                                            className="w-full h-40 object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>

                {/* About Section */}
                <section id="about" className="bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                        {/* About Hero */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 relative overflow-hidden">
                            {/* Background Decorative Elements */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="grid grid-cols-8 h-full gap-8">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="border-l border-gray-300"></div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Floating Decorative Elements */}
                                <div className="absolute top-32 right-10 w-12 h-12 bg-pink-200 rounded-full opacity-70"></div>
                                <div className="absolute top-2 left-1/4 w-8 h-8 bg-green-200 rounded-full opacity-80"></div>
                                <div className="absolute bottom-20 right-1/2 w-14 h-14 bg-purple-200 rounded-full opacity-60"></div>
                                <div className="absolute top-1/2 right-10 w-10 h-10 bg-orange-200 rounded-full opacity-70"></div>
                                
                            </div>

                            {/* Left Content */}
                            <div className="space-y-8 relative z-10">
                                <div className="space-y-6">
                                    <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                        {/* Desktop Layout */}
                                        <span className="hidden lg:inline">
                                            Tentang
                                            <br />
                                            <span className="relative">
                                                <span className="relative z-10 text-gray-900">Warung Pasinaon</span>
                                                <span className="absolute -bottom-0.5 left-0 right-0 h-8 lg:h-12 bg-gradient-to-r from-blue-200 via-blue-100 to-white-200 rounded-lg transform -rotate-1 -z-0"></span>
                                            </span>
                                        </span>
                                        
                                        {/* Mobile Layout */}
                                        <span className="lg:hidden">
                                            Tentang Warung{' '}
                                            <span className="relative">
                                                <span className="relative z-10 text-gray-900">Pasinaon</span>
                                                <span className="absolute -bottom-0.5 left-0 right-0 h-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white-200 rounded-lg transform -rotate-1 -z-0"></span>
                                            </span>
                                        </span>
                                    </h2>
                                    
                                    <p className="text-lg text-gray-600 leading-relaxed relative z-10">
                                        Warung Pasinaon adalah platform pembelajaran digital yang didedikasikan untuk menyediakan akses pendidikan berkualitas bagi semua kalangan. Kami berkomitmen menghadirkan inovasi dalam dunia pendidikan Indonesia melalui teknologi dan konten pembelajaran yang interaktif.
                                    </p>

                                    <p className="text-lg text-gray-600 leading-relaxed relative z-10">
                                        Dengan pengalaman bertahun-tahun di bidang pendidikan, kami memahami kebutuhan pembelajaran modern yang efektif dan menyenangkan. Platform kami dirancang untuk memfasilitasi proses belajar mengajar yang lebih engaging dan hasil yang optimal.
                                    </p>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="relative z-10 flex justify-center">
                                <div className="relative">
                                    {/* Main Photo Container */}
                                    <div className="relative">
                                        <div className="w-80 h-96 bg-gradient-to-br from-blue-100 to-white-100 rounded-3xl overflow-hidden shadow-2xl">
                                            <img 
                                                src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetTirta1.png?alt=media"
                                                alt="Bu Tirta Nursari - Pendiri Warung Pasinaon"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        
                                        {/* Floating Elements around Photo */}
                                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                            📚
                                        </div>
                                        <div className="absolute -top-2 -right-6 w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center text-white shadow-lg">
                                            ✨
                                        </div>
                                        <div className="absolute -bottom-4 -left-6 w-14 h-14 bg-blue-300 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                                            🎓
                                        </div>
                                        <div className="absolute -bottom-2 -right-4 w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-white shadow-lg">
                                            💡
                                        </div>
                                    </div>
                                    
                                    {/* Name Card */}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-3xl p-4 shadow-xl min-w-max">
                                        <div className="text-center">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">Ibu Tirta Nursari</h3>
                                            <p className="text-gray-600 text-sm mb-3">Pendiri Warung Pasinaon</p>
                                            <div className="flex justify-center">
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