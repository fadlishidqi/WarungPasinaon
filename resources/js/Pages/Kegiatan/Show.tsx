// resources/js/Pages/Kegiatan/Show.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface Kegiatan {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    image: string;
    date: string;
    tags: string[];
    meta_description?: string;
}

interface Props extends PageProps {
    kegiatan: Kegiatan;
    related: Kegiatan[];
}

export default function KegiatanShow({ auth, kegiatan, related }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head 
                title={`${kegiatan.title} - Warung Pasinaon`}
            />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                {/* Breadcrumb */}
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-4">
                                <li>
                                    <Link href="/" className="text-gray-400 hover:text-gray-500">
                                        <svg className="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <Link href="/kegiatan" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                            Kegiatan
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-4 text-sm font-medium text-gray-500 truncate">
                                            {kegiatan.title}
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                {/* Article Content */}
                <article className="py-12">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        {/* Header */}
                        <header className="mb-8">
                            <div className="mb-6">
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    {formatDate(kegiatan.date)}
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                                    {kegiatan.title}
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    {kegiatan.description}
                                </p>
                            </div>

                            {/* Tags */}
                            {kegiatan.tags && kegiatan.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                   {kegiatan.tags.map((tag, index) => (
                                       <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                           {tag}
                                       </span>
                                   ))}
                               </div>
                           )}

                           {/* Featured Image */}
                           {kegiatan.image && (
                               <div className="mb-8">
                                   <img 
                                       src={`/storage/${kegiatan.image}`} 
                                       alt={kegiatan.title}
                                       className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                                   />
                               </div>
                           )}
                       </header>

                       {/* Content */}
                       <div className="prose prose-lg max-w-none mb-12">
                           <div 
                               className="text-gray-700 leading-relaxed"
                               dangerouslySetInnerHTML={{ __html: kegiatan.content }}
                           />
                       </div>

                       {/* Share Buttons */}
                       <div className="border-t border-gray-200 pt-8 mb-12">
                           <div className="flex items-center justify-between">
                               <h3 className="text-lg font-semibold text-gray-900">Bagikan Artikel</h3>
                               <div className="flex space-x-4">
                                   <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                       <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                           <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                       </svg>
                                       Twitter
                                   </button>
                                   <button className="flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                                       <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                           <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                       </svg>
                                       Facebook
                                   </button>
                                   <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                       <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
                                       </svg>
                                       WhatsApp
                                   </button>
                               </div>
                           </div>
                       </div>
                   </div>
               </article>

               {/* Related Activities */}
               {related.length > 0 && (
                   <section className="py-16 bg-white">
                       <div className="max-w-7xl mx-auto px-6 lg:px-8">
                           <div className="text-center mb-12">
                               <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                   Kegiatan Terkait
                               </h2>
                               <p className="text-lg text-gray-600">
                                   Kegiatan lain yang mungkin menarik untuk Anda
                               </p>
                           </div>

                           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                               {related.map((item) => (
                                   <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                       <div className="relative">
                                           <img 
                                               src={item.image ? `/storage/${item.image}` : '/api/placeholder/400/200'} 
                                               alt={item.title}
                                               className="w-full h-48 object-cover"
                                           />
                                       </div>
                                       <div className="p-6">
                                           <div className="flex items-center text-sm text-gray-500 mb-3">
                                               <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                   <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                               </svg>
                                               {formatDate(item.date)}
                                           </div>
                                           <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                               {item.title}
                                           </h3>
                                           <p className="text-gray-600 mb-4 line-clamp-3">
                                               {item.description}
                                           </p>
                                           <Link 
                                               href={`/kegiatan/${item.slug}`}
                                               className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
                                           >
                                               Baca Selengkapnya
                                               <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                   <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                               </svg>
                                           </Link>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       </div>
                   </section>
               )}

               <Footer />
           </div>
       </>
   );
}