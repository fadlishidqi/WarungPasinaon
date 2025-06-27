import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Book } from '@/types';

interface BookReadProps {
    book: Book;
}

const BookRead: React.FC<BookReadProps> = ({ book }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pdfError, setPdfError] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error('Error toggling fullscreen:', error);
        }
    };

    const handlePdfLoad = () => {
        setLoading(false);
        setPdfError(false);
    };

    const handlePdfError = () => {
        setLoading(false);
        setPdfError(true);
    };

    return (
        <>
            <Head title={`Baca: ${book.title} - Warung Pasinaon`} />
            
            {/* Mini Navbar untuk halaman baca */}
            <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 shadow-sm">
                <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center space-x-4">
                        <Link 
                            href={`/buku-digital/${book.slug}`}
                            className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Kembali
                        </Link>
                        <div className="hidden md:block">
                            <h1 className="font-semibold text-gray-900 truncate max-w-md">
                                {book.title}
                            </h1>
                            <p className="text-sm text-gray-600">oleh {book.author}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={toggleFullscreen}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center"
                            title={isFullscreen ? "Keluar Fullscreen" : "Fullscreen"}
                        >
                            {isFullscreen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15H4.5M9 15v4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                            )}
                        </button>
                        <Link
                            href={`/buku-digital/${book.slug}/download`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                            Download
                        </Link>
                    </div>
                </div>
            </div>

            {/* PDF Viewer dengan margin top untuk navbar */}
            <div className="pt-16 h-screen">
                <div className="relative h-full">
                    {/* Loading State */}
                    {loading && (
                        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-40">
                            <div className="text-center text-white">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                                <p>Memuat buku...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {pdfError && (
                        <div className="h-full flex items-center justify-center bg-gray-100">
                            <div className="text-center p-8 max-w-md">
                                <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Tidak dapat memuat PDF
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Browser Anda mungkin tidak mendukung tampilan PDF atau file mengalami masalah.
                                </p>
                                <div className="flex gap-2 justify-center">
                                    <Link
                                        href={`/buku-digital/${book.slug}/download`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Download PDF
                                    </Link>
                                    <Link
                                        href={`/buku-digital/${book.slug}`}
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Kembali ke Detail
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PDF Iframe */}
                    {!pdfError && (
                        <iframe
                            src={`${book.pdf_url}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
                            className="w-full h-full border-0"
                            onLoad={handlePdfLoad}
                            onError={handlePdfError}
                            title={`Baca: ${book.title}`}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default BookRead;