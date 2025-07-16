import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import LoadingImage from '@/Components/LoadingImage';
import GeminiChatBot from '@/Components/GeminiChatBot';

export default function Home({ auth }: PageProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Memoize documentation images
    const documentationImages = useMemo(() => [
        { id: 1, image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel4.jpg?alt=media" },
        { id: 2, image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel2.jpg?alt=media" },
        { id: 3, image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel3.jpg?alt=media" },
        { id: 4, image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel6.jpg?alt=media" },
        { id: 5, image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel5.jpg?alt=media" },
        { id: 6, image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel7.jpg?alt=media" },
        { id: 7, image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel9.jpeg?alt=media" },
        { id: 8, image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel10.jpeg?alt=media" },
        { id: 9, image: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel11.jpeg?alt=media" },
    ], []);

    // Performance-optimized carousel
    useEffect(() => {
        // Trigger visibility animations
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Carousel with performance checks
    useEffect(() => {
        const shouldRunCarousel = !isHovered && 
                                  window.innerWidth > 768 && 
                                  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (shouldRunCarousel) {
            const timer = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % documentationImages.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [documentationImages.length, isHovered]);

    // Optimized handlers
    const goToSlide = useCallback((slideIndex: number) => {
        setCurrentSlide(slideIndex);
    }, []);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

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
                            <div className={`space-y-8 transition-all duration-700 ${
                                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                            }`}>
                                <div className="space-y-6">
                                    <h1 className={`text-5xl lg:text-6xl font-bold text-gray-900 leading-tight transition-all duration-700 delay-100 ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}>
                                        Selamat datang
                                        <br />
                                        di Warung{' '}
                                        <span className="relative">
                                            <span className="relative z-10 text-gray-900">Pasinaon!</span>
                                            <span className="absolute -bottom-0.5 left-0 right-0 h-12 bg-gradient-to-r from-pink-200 via-rose-200 to-red-200 rounded-lg transform -rotate-1 -z-0"></span>
                                        </span>
                                    </h1>
                                    
                                    <p className={`text-lg text-gray-600 leading-relaxed max-w-md transition-all duration-700 delay-200 ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}>
                                        TBM Warung Pasinaon bukan sekadar tempat baca, melainkan ruang belajar gratis yang terbuka untuk seluruh masyarakat. Berdiri sejak 2008 melalui Akta Notaris No. 07 Kantor Pengacara Achmad Dimyati, dan resmi mendapatkan izin penyelenggaraan pendidikan non-formal dari Dinas Pendidikan Kabupaten Semarang pada 28 September 2010.
                                    </p>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2">
                                    {[
                                        {
                                            icon: "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2Flogokabsmg.png?alt=media",
                                            title: "Kabupaten",
                                            subtitle: "Semarang",
                                            bgColor: "bg-blue-100",
                                            delay: "delay-300"
                                        },
                                        {
                                            svg: (
                                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            ),
                                            title: "TBM",
                                            subtitle: "Taman Bacaan Masyarakat",
                                            bgColor: "bg-green-100",
                                            delay: "delay-400"
                                        },
                                        {
                                            svg: (
                                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            ),
                                            title: "Literasi",
                                            subtitle: "Pendidikan Digital",
                                            bgColor: "bg-purple-100",
                                            delay: "delay-500"
                                        }
                                    ].map((item, index) => (
                                        <div 
                                            key={index}
                                            className={`bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-gray-100 
                                                       hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer
                                                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${item.delay}`}
                                        >
                                            <div className={`w-14 h-14 sm:w-16 sm:h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 ${item.icon ? 'overflow-hidden' : ''}`}>
                                                {item.icon ? (
                                                    <LoadingImage
                                                        src={item.icon}
                                                        alt={item.title}
                                                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                                    />
                                                ) : item.svg}
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-sm sm:text-base">{item.title}</h3>
                                            <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.subtitle}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-700 delay-600 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <Link
                                        href="/buku-digital"
                                        className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-8 py-4 rounded-2xl font-semibold text-lg 
                                                 hover:from-pink-500 hover:to-red-500 hover:scale-105 transition-all duration-300 
                                                 shadow-lg text-center inline-block w-full sm:w-auto"
                                    >
                                        Mulai Belajar
                                    </Link>
                                    <button
                                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg 
                                                 hover:border-gray-400 hover:bg-gray-50 hover:scale-105 transition-all duration-300 
                                                 w-full sm:w-auto"
                                    >
                                        Tentang Kami
                                    </button>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className={`space-y-4 transition-all duration-700 delay-300 ${
                                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                            }`}>
                                {/* Top Image */}
                                <div className="rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                                    <LoadingImage 
                                        src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel1.jpg?alt=media"
                                        className="w-full h-64 object-cover"
                                        alt='Warung Pasinaon'
                                    />
                                </div>
                                
                                {/* Bottom Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                                        <LoadingImage 
                                            src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetPasinaon2.png?alt=media" 
                                            alt="Diskusi Kelompok"
                                            className="w-full h-40 object-cover"
                                        />
                                    </div>
                                    <div className="rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                                        <LoadingImage 
                                            src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetCarausel8.jpg?alt=media" 
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
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20 relative overflow-hidden">
                            {/* Left Content */}
                            <div className="space-y-6 lg:space-y-8 relative z-10 order-2 lg:order-1 animate-fade-in-up">
                                <div className="space-y-4 lg:space-y-6">
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                                        <span className="hidden lg:inline">
                                            Tentang
                                            <br />
                                            <span className="relative">
                                                <span className="relative z-10 text-gray-900">Warung Pasinaon</span>
                                                <span className="absolute -bottom-0.5 left-0 right-0 h-8 lg:h-12 bg-gradient-to-r from-blue-200 via-blue-100 to-white-200 rounded-lg transform -rotate-1 -z-0"></span>
                                            </span>
                                        </span>
                                        
                                        <span className="lg:hidden text-center block">
                                            Tentang{' '}
                                            <span className="relative">
                                                <span className="relative z-10 text-gray-900">Warung Pasinaon</span>
                                                <span className="absolute -bottom-0.5 left-0 right-0 h-4 sm:h-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white-200 rounded-lg transform -rotate-1 -z-0"></span>
                                            </span>
                                        </span>
                                    </h2>
                                    
                                    <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed relative z-10">
                                        <p className="animate-fade-in-up animation-delay-200">
                                            Warung Pasinaon adalah sebuah Taman Bacaan Masyarakat (TBM) yang berdiri di Tegalsari RT 05/08, Bergaslor, Kec. Bergas, Kabupaten Semarang, Jawa Tengah. Didirikan sejak tahun 2007 oleh Ibu Tirta Nursari, Warung Pasinaon hadir sebagai ruang belajar gratis yang terbuka bagi siapa saja, khususnya anak-anak. 
                                        </p>
                                        <p className="animate-fade-in-up animation-delay-400">
                                            Pasinaon berasal dari bahasa jawa yaitu yang berarti belajar, jadi warung pasinaon adalah tempat pembelajaran
                                        </p>
                                        <p className="animate-fade-in-up animation-delay-600">
                                            Kegiatan yang ditawarkan sangat beragam, mulai dari kelas menulis, pelatihan desain dan videografi, literasi digital, hingga pelatihan baca-tulis bagi lansia. Dengan semangat gotong royong dan dukungan dari berbagai pihak, Warung Pasinaon menjadi simbol perubahan sosial berbasis komunitas, tempat di mana belajar menjadi menyenangkan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="relative z-10 flex justify-center order-1 lg:order-2 mb-8 lg:mb-0 animate-fade-in-up animation-delay-300">
                                <div className="relative">
                                    <div className="relative">
                                        <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-100 to-white-100 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
                                            <LoadingImage 
                                                src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2FAssetTirta1.png?alt=media"
                                                alt="Bu Tirta Nursari - Pendiri Warung Pasinaon"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        
                                        {/* Static floating elements for performance */}
                                        <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 bg-yellow-300 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                                            📚
                                        </div>
                                        <div className="absolute -top-1 -right-3 sm:-top-2 sm:-right-6 w-6 h-6 sm:w-10 sm:h-10 bg-pink-300 rounded-full flex items-center justify-center text-white shadow-lg text-xs sm:text-sm">
                                            ✨
                                        </div>
                                        <div className="absolute -bottom-2 -left-3 sm:-bottom-4 sm:-left-6 w-10 h-10 sm:w-14 sm:h-14 bg-blue-300 rounded-full flex items-center justify-center text-white text-sm sm:text-xl shadow-lg">
                                            🎓
                                        </div>
                                        <div className="absolute -bottom-1 -right-2 sm:-bottom-2 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 bg-green-300 rounded-full flex items-center justify-center text-white shadow-lg text-sm sm:text-base">
                                            💡
                                        </div>
                                    </div>
                                    
                                    <div className="absolute -bottom-4 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl min-w-max animate-fade-in-up animation-delay-800">
                                        <div className="text-center">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Ibu Tirta Nursari</h3>
                                            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">Pendiri Warung Pasinaon</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visi & Misi Section */}
                        <div className="space-y-12 mb-20">
                            {/* Visi */}
                            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 hover:scale-105 transition-transform duration-500 animate-fade-in-up">
                                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100">
                                        <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-4xl font-bold text-gray-900">Visi Kami</h3>
                                        <p className="text-xl text-gray-600 leading-relaxed">
                                            Turut membangun generasi Indonesia yang literat, kreatif, dan berkarakter melalui program multiliterasi yang menyenangkan, inklusif, dan relevan dengan zaman.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Misi */}
                            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 hover:scale-105 transition-transform duration-500 animate-fade-in-up animation-delay-200">
                                <div className="flex flex-col lg:flex-row items-start gap-8">
                                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 flex-shrink-0">
                                        <svg className="w-10 h-10 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 space-y-6">
                                        <h3 className="text-4xl font-bold text-gray-900">Misi Kami</h3>
                                        <ul className="space-y-4 text-lg text-gray-600">
                                            {[
                                                "Menyelenggarakan kegiatan literasi baca tulis, digital, dan aktivitas multi literasi lain yang dirancang untuk menarik minat anak remaja.",
                                                "Membangun ruang belajar yang inklusif dan ramah anak, di mana semua kalangan termasuk kalangan disabilitas dan rentan dapat mengakses pengetahuan dan berekspresi.",
                                                "Mendorong keterlibatan aktif keluarga dan komunitas dalam upaya membentuk ekosistem literasi yang berkelanjutan.",
                                                "Mengembangkan media dan konten literasi secara kreatif untuk memperkuat daya pikir kritis dan karakter positif.",
                                                "Menjalin kolaborasi dengan berbagai pihak guna memperluas dampak program dan keberlanjutan kegiatan literasi."
                                            ].map((misi, index) => (
                                                <li key={index} className={`flex items-start gap-4 animate-fade-in-up animation-delay-${(index + 1) * 100}`}>
                                                    <div className="bg-gradient-to-r from-pink-400 to-pink-600 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
                                                    <span>{misi}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="space-y-8 mb-20">
                            <div className="text-center animate-fade-in-up">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    Dimana sih Warung Pasinaon? 👀
                                </h3>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up animation-delay-200">
                                <div className="p-4">
                                    <div className="rounded-2xl overflow-hidden">
                                        <iframe 
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.40713530223968!2d110.42329717129891!3d-7.182017057030015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1751368800410!5m2!1sen!2sid" 
                                            width="100%" 
                                            height="450" 
                                            style={{border: 0}}
                                            allowFullScreen={true}
                                            loading="lazy" 
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Information Cards Grid */}
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    {
                                        icon: (
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                        ),
                                        title: "Alamat Lengkap",
                                        content: "Tegalsari RT 05/08, Bergaslor, Kec. Bergas, Kabupaten Semarang, Jawa Tengah 50552",
                                        bgColor: "bg-blue-100",
                                        delay: "animation-delay-300"
                                    },
                                    {
                                        icon: (
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        ),
                                        title: "Jam Operasional",
                                        content: (
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <p>Senin - Jumat: 15:00 - 17:00 WIB</p>
                                                <p>Sabtu - Minggu: 08:00 - 11:00 WIB</p>
                                            </div>
                                        ),
                                        bgColor: "bg-green-100",
                                        delay: "animation-delay-400"
                                    },
                                    {
                                        icon: (
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                                           </svg>
                                       ),
                                       title: "Akses Transportasi",
                                       content: "Mudah dijangkau dengan kendaraan pribadi atau transportasi umum. Terletak 90 meter dari jalan raya.",
                                       bgColor: "bg-purple-100",
                                       delay: "animation-delay-500"
                                   }
                               ].map((card, index) => (
                                   <div 
                                       key={index}
                                       className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 
                                                  hover:scale-105 hover:-translate-y-2 transition-all duration-300 
                                                  animate-fade-in-up ${card.delay}`}
                                   >
                                       <div className="flex items-start gap-4">
                                           <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                               {card.icon}
                                           </div>
                                           <div>
                                               <h4 className="font-bold text-gray-900 mb-2">{card.title}</h4>
                                               {typeof card.content === 'string' ? (
                                                   <p className="text-gray-600 leading-relaxed text-sm">{card.content}</p>
                                               ) : (
                                                   card.content
                                               )}
                                           </div>
                                       </div>
                                   </div>
                               ))}
                           </div>

                           {/* Action Button */}
                           <div className="text-center animate-fade-in-up animation-delay-600">
                               <a 
                                   href="https://maps.google.com/?q=Warung+Pasinaon+Tegalsari+Bergaslor+Bergas+Semarang" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold 
                                            hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
                               >
                                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                   </svg>
                                   Buka di Google Maps
                               </a>
                           </div>
                       </div>

                       {/* Documentation Carousel */}
                       <div className="space-y-8">
                           <div className="text-center animate-fade-in-up">
                               <h3 className="text-4xl font-bold text-gray-900 mb-4">
                                   Dokumentasi Kegiatan
                               </h3>
                               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                   Momen-momen penting dalam perjalanan Warung Pasinaon
                               </p>
                           </div>

                           {/* Optimized Carousel Container */}
                           <div 
                               className="relative max-w-5xl mx-auto animate-fade-in-up animation-delay-200"
                               onMouseEnter={handleMouseEnter}
                               onMouseLeave={handleMouseLeave}
                           >
                               {/* Carousel Container */}
                               <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
                                   {documentationImages.map((item, index) => (
                                       <div
                                           key={item.id}
                                           className={`absolute inset-0 transition-opacity duration-500 ${
                                               index === currentSlide ? 'opacity-100' : 'opacity-0'
                                           }`}
                                       >
                                           <LoadingImage
                                               src={item.image}
                                               alt={`Dokumentasi ${item.id}`}
                                               className="w-full h-full object-cover"
                                               loadingText="Memuat dokumentasi..."
                                           />
                                           <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                       </div>
                                   ))}
                               </div>

                               {/* Carousel Indicators */}
                               <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                                   {documentationImages.map((_, index) => (
                                       <button
                                           key={index}
                                           onClick={() => goToSlide(index)}
                                           className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                                               index === currentSlide 
                                                   ? 'bg-white scale-125' 
                                                   : 'bg-white/50 hover:bg-white/75'
                                           }`}
                                       />
                                   ))}
                               </div>

                               {/* Navigation Arrows - Optional */}
                               <button 
                                   onClick={() => goToSlide(currentSlide === 0 ? documentationImages.length - 1 : currentSlide - 1)}
                                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all duration-200"
                                   aria-label="Previous slide"
                               >
                                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                                   </svg>
                               </button>
                               <button 
                                   onClick={() => goToSlide(currentSlide === documentationImages.length - 1 ? 0 : currentSlide + 1)}
                                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all duration-200"
                                   aria-label="Next slide"
                               >
                                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                   </svg>
                               </button>
                           </div>
                       </div>
                   </div>
               </section>

               <Footer />
               <GeminiChatBot/>
           </div>
       </>
   );
}