<x-filament-panels::page>
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Peringkat</th>
                    <th scope="col" class="px-6 py-3">Nama Anak</th>
                    <th scope="col" class="px-6 py-3">Total Poin Hari Ini</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($this->rankings as $index => $rank)
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ $index + 1 }}
                        </td>
                        <td class="px-6 py-4">
                            {{ $rank['name'] }}
                        </td>
                        <td class="px-6 py-4">
                            {{ $rank['total_points'] }}
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3" class="px-6 py-4 text-center text-gray-500">
                            Belum ada data peringkat untuk hari ini.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</x-filament-panels::page>