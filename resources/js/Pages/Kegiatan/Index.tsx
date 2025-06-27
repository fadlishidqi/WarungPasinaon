"use client"
import { Head, Link, router } from "@inertiajs/react"
import type { PageProps } from "@/types"
import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer"

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
  const categories = [
    { key: "literasi", label: "Literasi", count: categoryCounts.literasi },
    { key: "keagamaan", label: "Keagamaan", count: categoryCounts.keagamaan },
    { key: "kesehatan", label: "Kesehatan", count: categoryCounts.kesehatan },
    { key: "umkm", label: "UMKM", count: categoryCounts.umkm },
  ]

  const handleCategoryChange = (category: string) => {
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
    <>
      <Head title="Kegiatan - Warung Pasinaon" />

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Header Section */}
        <section className="pt-14">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Kegiatan Warung Pasinaon</h1>
              <p className="text-gray-600 text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                Dokumentasi berbagai kegiatan pembelajaran dan pengembangan yang telah kami selenggarakan untuk kemajuan
                pendidikan
              </p>

              {/* Category Navigation */}
              <div className="flex justify-center">
                <nav className="flex space-x-8">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      onClick={() => handleCategoryChange(category.key)}
                      className={`relative pb-3 font-medium text-base transition-colors duration-200 ${
                        currentCategory === category.key ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {category.label}
                      {currentCategory === category.key && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
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
                {kegiatan.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image ? `/storage/${item.image}` : "/api/placeholder/400/240"}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">{item.title}</h3>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{item.description}</p>

                      <Link
                        href={`/kegiatan/${item.slug}`}
                        className="inline-flex items-center text-red-500 hover:text-red-600 font-medium text-sm transition-colors duration-200"
                      >
                        Lihat Detail
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Belum Ada Kegiatan</h3>
                <p className="text-gray-600">
                  Kegiatan untuk kategori {categories.find((cat) => cat.key === currentCategory)?.label} belum tersedia.
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
