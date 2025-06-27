import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Book, BookCategories } from '@/types';

interface Props {
    book: Book;
}

const BookShow: React.FC<Props> = ({ book }) => {
    const categories: BookCategories = {
        'fiksi': 'Fiksi',
        'non-fiksi': 'Non-Fiksi',
        'pendidikan': 'Pendidikan',
        'sejarah': 'Sejarah',
        'teknologi': 'Teknologi',
        'agama': 'Agama'
    };

    const formatNumber = (num: number): string => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    return (
        <>
            <Head title={book.title} />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <Link
                        href="/buku-digital"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Perpustakaan
                    </Link>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/3 p-6">
                                <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden mb-4">
                                    {book.cover_image ? (
                                        <img
                                            src={book.cover_url}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        href={`/buku-digital/${book.slug}/baca`}
                                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg text-center hover:bg-green-700 transition-colors block font-medium"
                                    >
                                        📖 Baca Online
                                    </Link>
                                    <Link
                                        href={`/buku-digital/${book.slug}/download`}
                                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition-colors block font-medium"
                                    >
                                        ⬇️ Download PDF
                                    </Link>
                                </div>
                            </div>

                            <div className="md:w-2/3 p-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {book.title}
                                </h1>
                                <p className="text-xl text-gray-600 mb-4">
                                    oleh <span className="font-semibold">{book.author}</span>
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500">Kategori</div>
                                        <div className="font-semibold">{categories[book.category]}</div>
                                    </div>
                                    {book.published_year && (
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-sm text-gray-500">Tahun Terbit</div>
                                            <div className="font-semibold">{book.published_year}</div>
                                        </div>
                                    )}
                                    {book.pages && (
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-sm text-gray-500">Halaman</div>
                                            <div className="font-semibold">{formatNumber(book.pages)}</div>
                                        </div>
                                    )}
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500">Download</div>
                                        <div className="font-semibold">{formatNumber(book.download_count)}x</div>
                                    </div>
                                </div>

                                {book.publisher && (
                                    <div className="mb-4">
                                        <span className="text-sm text-gray-500">Penerbit: </span>
                                        <span className="font-semibold">{book.publisher}</span>
                                    </div>
                                )}

                                {book.isbn && (
                                    <div className="mb-4">
                                        <span className="text-sm text-gray-500">ISBN: </span>
                                        <span className="font-mono text-sm">{book.isbn}</span>
                                    </div>
                                )}

                                {book.file_size && (
                                    <div className="mb-6">
                                        <span className="text-sm text-gray-500">Ukuran File: </span>
                                        <span className="font-semibold">{book.file_size}</span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-3">Deskripsi</h2>
                                    <div className="prose prose-gray max-w-none">
                                        {book.description.split('\n').map((paragraph: string, index: number) => (
                                            <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {book.tags && book.tags.length > 0 && (
                                    <div>
                                        <h2 className="text-lg font-semibold mb-3">Tags</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {book.tags.map((tag: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookShow;