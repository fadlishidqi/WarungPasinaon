"use client"
import { Head, Link, router } from "@inertiajs/react"
import type { PageProps } from "@/types"
import CompanyLayout from "@/Components/CompanyLayout"
import { useState, useEffect } from "react"
import GeminiChatBot from '@/Components/GeminiChatBot';

interface Kegiatan {
  id: number
  title: string
  slug: string
  description: string
  image: string
  date: string
  category: string
  tags: string[]
}

interface Props extends PageProps {
  kegiatan: Kegiatan[]
  currentCategory: string
  categoryCounts: {
    literasi: number
    keagamaan: number
    kesehatan: number
    umkm: number
  }
}

export default function KegiatanIndex({ auth, kegiatan, currentCategory, categoryCounts }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(currentCategory);

  const categories = [
    { key: "literasi", label: "Literasi", count: categoryCounts.literasi },
    { key: "keagamaan", label: "Keagamaan", count: categoryCounts.keagamaan },
    { key: "kesehatan", label: "Kesehatan", count: categoryCounts.kesehatan },
    { key: "umkm", label: "UMKM", count: categoryCounts.umkm },
  ]

  // Trigger visibility animations
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Update active category when currentCategory changes
  useEffect(() => {
    setActiveCategory(currentCategory);
  }, [currentCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    router.get(
      "/kegiatan",
      { category },
      {
        preserveState: true,
        replace: true,
      },
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <CompanyLayout>
      <Head title="Kegiatan - Warung Pasinaon" />

      {/* Simplified background - only on desktop */}
      <div className="hidden lg:block fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-1000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="min-h-screen bg-white">
        {/* Shadow below navbar */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent shadow-sm"></div>

        {/* Header Section */}
        <section className="pt-14">
          <div className="max-w-4xl mx-auto px-6">
            <div className={`text-center mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className={`transition-all duration-600 delay-200 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Kegiatan Warung Pasinaon
                </h1>
              </div>

              <p className={`text-gray-600 text-base mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-600 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Dokumentasi berbagai kegiatan pembelajaran dan pengembangan yang telah kami selenggarakan untuk kemajuan
                pendidikan
              </p>

              {/* Category Navigation */}
              <div className={`flex justify-center transition-all duration-600 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <nav className="flex space-x-8">
                  {categories.map((category, index) => (
                    <button
                      key={category.key}
                      onClick={() => handleCategoryChange(category.key)}
                      className={`relative pb-3 font-medium text-base transition-all duration-300 hover:scale-105 ${
                        activeCategory === category.key ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                      } animate-fade-in-up`}
                      style={{ animationDelay: `${500 + (index * 100)}ms` }}
                    >
                      {category.label}
                      {activeCategory === category.key && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 animate-scale-x origin-left" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-6">
            {kegiatan.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {kegiatan.map((item, index) => (
                  <div
                    key={`${item.id}-${currentCategory}`}
                    className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:scale-105 hover:-translate-y-2 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 100 + 600}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image ? `/storage/${item.image}` : "/api/placeholder/400/240"}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      <div className="transform transition-transform duration-200 group-hover:translate-x-1">
                        <Link
                          href={`/kegiatan/${item.slug}`}
                          className="inline-flex items-center text-red-500 hover:text-red-600 font-medium text-sm transition-all duration-200 group/link hover:scale-105"
                        >
                          <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                            Lihat Detail
                          </span>
                          <svg 
                            className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in-up">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center animate-bounce-slow">
                  <svg 
                    className="w-12 h-12 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Belum Ada Kegiatan
                </h3>

                <p className="text-gray-600">
                  Kegiatan untuk kategori {categories.find((cat) => cat.key === currentCategory)?.label} belum tersedia.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
      <GeminiChatBot />
    </CompanyLayout>
  )
}