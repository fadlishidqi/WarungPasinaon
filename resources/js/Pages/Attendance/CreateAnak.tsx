import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CreateAnak() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'child', // Nilai type sudah ditentukan
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('attendance.store'));
    };

    return (
        <GuestLayout>
            <Head title="Absensi Anak-Anak" />

            <form onSubmit={submit}>
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">Absensi Adik-Adik Hebat!</h2>
                </div>
            
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap Kamu" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Hadir & Dapat Poin!
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}