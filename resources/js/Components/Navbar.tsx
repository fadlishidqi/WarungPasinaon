// resources/js/Components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import LoadingImage from '@/Components/LoadingImage';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
                            <LoadingImage 
                                src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2Flogo_pasinaon.png?alt=media" 
                                alt="Warung Pasinaon Logo" 
                                className="h-16 w-16 object-contain"
                            />
                            <div>
                                <span className="text-2xl font-black text-gray-900">
                                    Warung Pasinaon
                                </span>
                                <div className="text-xs text-gray-500 -mt-1">
                                    Ruang Belajar Bersama
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/" 
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/kegiatan" 
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                        >
                            Kegiatan
                        </Link>
                        <Link 
                            href="/kelas" 
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                        >
                            Kelas
                        </Link>
                        <Link 
                            href="/buku-digital" 
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                        >
                            Buku Digital
                        </Link>
                        <Link 
                            href="/ranking" 
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                        >
                            Ranking
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
                            <Link href="/" className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                                Home
                            </Link>
                            <Link href="/kegiatan" className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                                Kegiatan
                            </Link>
                            <Link href="/kelas" className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                                Kelas
                            </Link>
                            <Link href="/buku-digital" className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                                Buku Digital
                            </Link>
                            <Link href="/ranking" className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                                Ranking
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;