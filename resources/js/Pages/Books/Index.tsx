import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BookFilters } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

// Interface yang aman untuk data pagination
interface SafePaginatedBooks {
    data: any[];
    links?: any[];
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

interface BooksIndexProps {
    books: SafePaginatedBooks;
    categories: { [key: string]: string };
    filters: BookFilters;
}

const BooksIndex: React.FC<BooksIndexProps> = ({ books, categories, filters }) => {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    // Safe access untuk data
    const booksData = books?.data || [];
    const booksMeta = books?.meta;
    const booksLinks = books?.links || [];

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    const getCategoryBadgeColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'fiksi': 'bg-purple-100 text-purple-800',
            'non-fiksi': 'bg-blue-100 text-blue-800',
            'pendidikan': 'bg-green-100 text-green-800',
            'sejarah': 'bg-yellow-100 text-yellow-800',
            'teknologi': 'bg-gray-100 text-gray-800',
            'agama': 'bg-teal-100 text-teal-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/buku-digital', {
            search: searchTerm,
            category: selectedCategory
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        router.get('/buku-digital', {
            search: searchTerm,
            category: category
        }, {
            preserveState: true,
            replace: true
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        router.get('/buku-digital', {}, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <>
            <Head title="Buku Digital - Warung Pasinaon" />
            <Navbar />
            
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                📚 Perpustakaan Digital
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Kumpulan buku digital berkualitas untuk mendukung pembelajaran Anda
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    {/* Search and Filter Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Cari judul buku, penulis, atau deskripsi..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:w-48">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Semua Kategori</option>
                                    {Object.entries(categories).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Cari
                                </button>
                                {(searchTerm || selectedCategory) && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Results Info */}
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-600">
                            Menampilkan {formatNumber(booksData.length)} 
                            {booksMeta?.total && ` dari ${formatNumber(booksMeta.total)}`} buku
                            {(searchTerm || selectedCategory) && (
                                <span className="ml-2">
                                    untuk 
                                    {searchTerm && <span className="font-semibold"> "{searchTerm}"</span>}
                                    {selectedCategory && <span className="font-semibold"> kategori {categories[selectedCategory]}</span>}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Books Grid */}
                    {booksData.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                            {booksData.map((book: any) => (
                                <div key={book.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                                    <div className="aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
                                        {book.cover_url ? (
                                            <img
                                                src={book.cover_url}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {book.author}
                                        </p>
                                        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryBadgeColor(book.category)}`}>
                                                {categories[book.category]}
                                            </span>
                                            {book.published_year && (
                                                <span>{book.published_year}</span>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/buku-digital/${book.slug}`}
                                                className="flex-1 bg-blue-600 text-white text-sm px-3 py-2 rounded text-center hover:bg-blue-700 transition-colors font-medium"
                                            >
                                                Detail
                                            </Link>
                                            <Link
                                                href={`/buku-digital/${book.slug}/baca`}
                                                className="flex-1 bg-green-600 text-white text-sm px-3 py-2 rounded text-center hover:bg-green-700 transition-colors font-medium"
                                            >
                                                Baca
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-500 mb-2">Tidak ada buku ditemukan</h3>
                            <p className="text-gray-400 mb-4">
                                {(searchTerm || selectedCategory) 
                                    ? 'Coba ubah kata kunci atau filter pencarian Anda' 
                                    : 'Belum ada buku yang tersedia'
                                }
                            </p>
                            {(searchTerm || selectedCategory) && (
                                <button
                                    onClick={clearFilters}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Lihat Semua Buku
                                </button>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {booksMeta && booksMeta.last_page > 1 && (
                        <div className="flex justify-center space-x-2">
                            {booksLinks.map((link: any, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        link.active
                                            ? 'bg-green-600 text-white'
                                            : link.url
                                            ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </>
    );
};

export default BooksIndex;