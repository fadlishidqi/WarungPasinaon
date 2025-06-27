import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Book } from '@/types';

interface Props {
    book: Book;
}

const BookRead: React.FC<Props> = ({ book }) => {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [pdfError, setPdfError] = useState<boolean>(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = async (): Promise<void> => {
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

    const handleIframeLoad = (): void => {
        setLoading(false);
    };

    const handleIframeError = (): void => {
        setLoading(false);
        setPdfError(true);
    };

    // Generate PDF URL dengan parameter yang lebih kompatibel
    const getPdfViewerUrl = (): string => {
        const baseUrl = book.pdf_url;
        // Tambahkan parameter untuk mengatasi error PDF.js
        const params = new URLSearchParams({
            'toolbar': '1',
            'navpanes': '0',
            'scrollbar': '1',
            'view': 'FitH',
            'pagemode': 'none'
        });
        
        return `${baseUrl}#${params.toString()}`;
    };

    return (
        <>
            <Head title={`Baca ${book.title}`} />
            <div className="min-h-screen bg-gray-900">
                {/* Header */}
                <div className="bg-white shadow-sm border-b relative z-50">
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={`/buku-digital/${book.slug}`}
                                    className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Kembali"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </Link>
                                <div className="min-w-0 flex-1">
                                    <h1 className="font-semibold text-gray-900 truncate max-w-md">
                                        {book.title}
                                    </h1>
                                    <p className="text-sm text-gray-600 truncate">
                                        {book.author}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
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
                </div>

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
                    <div className="h-screen pt-16 flex items-center justify-center bg-gray-100">
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
                            <div className="space-y-2">
                                <a
                                    href={book.pdf_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Buka di Tab Baru
                                </a>
                                <Link
                                    href={`/buku-digital/${book.slug}/download`}
                                    className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Download PDF
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* PDF Viewer */}
                {!pdfError && (
                    <div className="h-screen pt-16">
                        <iframe
                            src={getPdfViewerUrl()}
                            className="w-full h-full border-0"
                            title={book.title}
                            allowFullScreen
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                            style={{ display: loading ? 'none' : 'block' }}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default BookRead;