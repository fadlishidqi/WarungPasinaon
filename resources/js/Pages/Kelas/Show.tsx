import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import CompanyLayout from '@/Components/CompanyLayout';

interface Kelas {
    id: number;
    nama: string;
    deskripsi: string;
    gambar: string;
    tanggal: string;
    hari: string;
    kategori: string;
    grup_wa?: string;
    kapasitas: number;
    terdaftar: number;
    is_available: boolean;
}

interface Props {
    kelas: Kelas;
}

const Show: React.FC<Props> = ({ kelas }) => {
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        alamat: '',
        no_telp: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/kelas/${kelas.id}/daftar`, {
            onSuccess: () => {
                reset();
                setShowForm(false);
            }
        });
    };

    return (
        <CompanyLayout>
            <Head title={`${kelas.nama} - Warung Pasinaon`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex mb-8" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/kelas" className="text-blue-600 hover:text-blue-800">
                                    Kelas
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-500 ml-1 md:ml-2">{kelas.nama}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Header Image */}
                        <div className="relative h-64 md:h-96">
                            <img
                                src={kelas.gambar}
                                alt={kelas.nama}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
                                    {kelas.kategori}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4">
                                <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                                    GRATIS
                                </span>
                            </div>
                            {!kelas.is_available && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <span className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold text-lg">
                                        Kelas Tidak Tersedia
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                        {kelas.nama}
                                    </h1>

                                    <div className="prose max-w-none mb-6">
                                        <p className="text-gray-600 leading-relaxed">
                                            {kelas.deskripsi}
                                        </p>
                                    </div>

                                    {/* WhatsApp Group */}
                                    {kelas.grup_wa && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                            <h3 className="font-semibold text-green-800 mb-2">Grup WhatsApp Kelas</h3>
                                            <p className="text-green-700 text-sm mb-3">
                                                Bergabunglah dengan grup WhatsApp untuk mendapatkan update dan berkomunikasi dengan peserta lain.
                                            </p>
                                            <a
                                                href={kelas.grup_wa}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                                                </svg>
                                                Gabung Grup WhatsApp
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Sidebar */}
                                <div className="lg:col-span-1">
                                    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detail Kelas</h3>

                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm text-gray-500">Tanggal</p>
                                                    <p className="font-medium">{kelas.hari}, {kelas.tanggal}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm text-gray-500">Kapasitas</p>
                                                    <p className="font-medium">{kelas.terdaftar}/{kelas.kapasitas} peserta</p>
                                                </div>
                                            </div>

                                            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-center font-semibold">
                                                GRATIS
                                            </div>
                                        </div>

                                        {/* Registration Button */}
                                        {kelas.is_available ? (
                                            <button
                                                onClick={() => setShowForm(true)}
                                                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                                            >
                                                Daftar Sekarang
                                            </button>
                                        ) : (
                                            <div className="w-full mt-6 bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg text-center">
                                                Tidak Tersedia
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Registration Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Daftar Kelas: {kelas.nama}</h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Lengkap *
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                            </div>

                            <div>
                                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
                                    Alamat *
                                </label>
                                <textarea
                                    id="alamat"
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>}
                            </div>

                            <div>
                                <label htmlFor="no_telp" className="block text-sm font-medium text-gray-700 mb-1">
                                    No. Telepon *
                                </label>
                                <input
                                    type="tel"
                                    id="no_telp"
                                    value={data.no_telp}
                                    onChange={(e) => setData('no_telp', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="08xxxxxxxxxx"
                                    required
                                />
                                {errors.no_telp && <p className="text-red-500 text-sm mt-1">{errors.no_telp}</p>}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50"
                                >
                                    {processing ? 'Mendaftar...' : 'Daftar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </CompanyLayout>
    );
};

export default Show;