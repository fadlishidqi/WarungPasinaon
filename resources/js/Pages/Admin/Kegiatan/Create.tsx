import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        content: '',
        category: 'literasi',
        date: '',
        status: 'draft',
        image: null as File | null,
        meta_description: '',
        tags: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.kegiatan.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tambah Kegiatan
                    </h2>
                    <Link
                        href={route('admin.kegiatan.index')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Kegiatan" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                                <div>
                                    <InputLabel htmlFor="title" value="Judul Kegiatan" />
                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        autoFocus
                                        placeholder="Masukkan judul kegiatan (slug akan dibuat otomatis)"
                                    />
                                    <InputError className="mt-2" message={errors.title} />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Slug akan dibuat otomatis dari judul
                                    </p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Deskripsi Singkat" />
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                        placeholder="Deskripsi singkat untuk preview"
                                    />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="content" value="Konten Kegiatan" />
                                    <textarea
                                        id="content"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows={10}
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        required
                                        placeholder="Tulis konten lengkap kegiatan di sini..."
                                    />
                                    <InputError className="mt-2" message={errors.content} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="category" value="Kategori" />
                                        <select
                                            id="category"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            required
                                        >
                                            <option value="literasi">Literasi</option>
                                            <option value="keagamaan">Keagamaan</option>
                                            <option value="kesehatan">Kesehatan</option>
                                            <option value="umkm">UMKM</option>
                                        </select>
                                        <InputError className="mt-2" message={errors.category} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="date" value="Tanggal Kegiatan" />
                                        <TextInput
                                            id="date"
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.date} />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                    <select
                                        id="status"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        required
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                    <InputError className="mt-2" message={errors.status} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="Gambar Kegiatan" />
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                    />
                                    <InputError className="mt-2" message={errors.image} />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Format: JPG, PNG, GIF. Maksimal 2MB
                                    </p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="meta_description" value="Meta Description (SEO)" />
                                    <textarea
                                        id="meta_description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows={2}
                                        maxLength={160}
                                        value={data.meta_description}
                                        onChange={(e) => setData('meta_description', e.target.value)}
                                        placeholder="Deskripsi untuk SEO (maksimal 160 karakter)"
                                    />
                                    <InputError className="mt-2" message={errors.meta_description} />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {data.meta_description.length}/160 karakter
                                    </p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="tags" value="Tags (pisahkan dengan koma)" />
                                    <TextInput
                                        id="tags"
                                        className="mt-1 block w-full"
                                        value={data.tags}
                                        onChange={(e) => setData('tags', e.target.value)}
                                        placeholder="literasi, pendidikan, anak"
                                    />
                                    <InputError className="mt-2" message={errors.tags} />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Contoh: literasi, pendidikan, anak
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Link
                                        href={route('admin.kegiatan.index')}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Batal
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Menyimpan...' : 'Simpan Kegiatan'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}