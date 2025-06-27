import React, { useState, FormEvent } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Book, PaginatedBooks, BookCategories, BookFilters } from '@/types';

interface Props {
    books: PaginatedBooks;
    categories: BookCategories;
    filters: BookFilters;
}

const BooksIndex: React.FC<Props> = ({ books, categories, filters }) => {
    const [search, setSearch] = useState<string>(filters.search || '');
    const [category, setCategory] = useState<string>(filters.category || '');

    const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        router.get('/buku-digital', { search, category }, { preserveState: true });
    };

    const handleCategoryChange = (newCategory: string): void => {
        setCategory(newCategory);
        router.get('/buku-digital', { search, category: newCategory }, { preserveState: true });
    };

    const getCategoryBadgeColor = (cat: string): string => {
        const colors: Record<string, string> = {
            'fiksi': 'bg-purple-100 text-purple-800',
            'non-fiksi': 'bg-green-100 text-green-800',
            'pendidikan': 'bg-blue-100 text-blue-800',
            'sejarah': 'bg-yellow-100 text-yellow-800',
            'teknologi': 'bg-red-100 text-red-800',
            'agama': 'bg-gray-100 text-gray-800',
        };
        return colors[cat] || 'bg-gray-100 text-gray-800';
    };

    return (
        <>
            <Head title="Buku Digital" />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Perpustakaan Digital
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Koleksi buku digital yang dapat Anda baca secara online atau download
                        </p>
                    </div>

                    {/* Search & Filter */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Cari judul buku, penulis..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleCategoryChange('')}
                                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                    !category 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Semua
                            </button>
                            {Object.entries(categories).map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => handleCategoryChange(key)}
                                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                        category === key 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Books Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {books.data.map((book: Book) => (
                            <div key={book.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="aspect-[3/4] bg-gray-200">
                                    {book.cover_image ? (
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
                                            className="flex-1 bg-blue-600 text-white text-sm px-3 py-2 rounded text-center hover:bg-blue-700 transition-colors"
                                        >
                                            Detail
                                        </Link>
                                        <Link
                                            href={`/buku-digital/${book.slug}/baca`}
                                            className="flex-1 bg-green-600 text-white text-sm px-3 py-2 rounded text-center hover:bg-green-700 transition-colors"
                                        >
                                            Baca
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {books.links && books.links.length > 3 && (
                        <div className="flex justify-center">
                            <nav className="flex items-center space-x-1">
                                {books.links.map((link, index) => (
                                    <React.Fragment key={index}>
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                className="px-3 py-2 text-sm font-medium text-gray-300 cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </nav>
                        </div>
                    )}

                    {/* Empty State */}
                    {books.data.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Tidak ada buku ditemukan
                            </h3>
                            <p className="text-gray-600">
                                Coba ubah kata kunci pencarian atau filter kategori
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BooksIndex;