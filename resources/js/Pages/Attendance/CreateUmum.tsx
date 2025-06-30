import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CreateUmum() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'general', // Nilai type sudah ditentukan
        institution: '',
        purpose: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('attendance.store'));
    };

    return (
        <GuestLayout>
            <Head title="Absensi Pengunjung Umum" />

            <form onSubmit={submit}>
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">Absensi Pengunjung Umum</h2>
                </div>
            
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap Anda" />
                    <TextInput id="name" type="text" value={data.name} className="mt-1 block w-full" isFocused={true} onChange={(e) => setData('name', e.target.value)} required />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="institution" value="Asal Institusi / Sekolah" />
                    <TextInput id="institution" type="text" value={data.institution} className="mt-1 block w-full" onChange={(e) => setData('institution', e.target.value)} />
                    <InputError message={errors.institution} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="purpose" value="Keperluan Kunjungan" />
                    <TextInput id="purpose" type="text" value={data.purpose} className="mt-1 block w-full" onChange={(e) => setData('purpose', e.target.value)} />
                    <InputError message={errors.purpose} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Catat Kehadiran
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}