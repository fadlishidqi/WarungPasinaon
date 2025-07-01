// resources/js/Pages/Ranking/Index.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import CompanyLayout from '@/Components/CompanyLayout';

interface RankingItem {
    rank: number;
    name: string;
    total_points: number;
    last_visit: string;
    total_visits: number;
}

interface Stats {
    total_children: number;
    children_with_points: number;
    total_points_distributed: number;
    avg_points: number;
}

interface Props {
    rankings: RankingItem[];
    stats: Stats;
}

const Index: React.FC<Props> = ({ rankings, stats }) => {
    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1:
                return {
                    bg: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
                    text: 'text-white',
                    rankBg: 'bg-yellow-600',
                    shadow: 'shadow-yellow-200'
                };
            case 2:
                return {
                    bg: 'bg-gradient-to-r from-gray-300 to-gray-400',
                    text: 'text-white',
                    rankBg: 'bg-gray-500',
                    shadow: 'shadow-gray-200'
                };
            case 3:
                return {
                    bg: 'bg-gradient-to-r from-orange-400 to-orange-500',
                    text: 'text-white',
                    rankBg: 'bg-orange-600',
                    shadow: 'shadow-orange-200'
                };
            default:
                return {
                    bg: 'bg-white',
                    text: 'text-gray-800',
                    rankBg: 'bg-gray-100',
                    shadow: 'shadow-gray-100'
                };
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase();
    };

    const getAvatarColor = (rank: number) => {
        const colors = [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
            'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500',
            'bg-orange-500', 'bg-cyan-500'
        ];
        return colors[(rank - 1) % colors.length];
    };

    return (
        <CompanyLayout>
            <Head title="Ranking Anak-anak - Warung Pasinaon" />
            
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            🏆 Leaderboard Anak-anak
                        </h1>
                        <p className="text-gray-600">
                            Setiap kunjungan perpustakaan = 50 poin
                        </p>
                    </div>

                    {/* Rankings List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900">Ranking</h2>
                        </div>
                        
                        <div className="divide-y divide-gray-50">
                            {rankings.map((item) => {
                                const style = getRankStyle(item.rank);
                                const isTopThree = item.rank <= 3;
                                
                                return (
                                    <div 
                                        key={item.rank} 
                                        className={`p-4 transition-all duration-200 hover:bg-gray-50 ${
                                            isTopThree ? `${style.bg} ${style.shadow} shadow-lg` : 'bg-white'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                {/* Rank Number */}
                                                <div className={`
                                                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                                    ${isTopThree ? style.rankBg + ' text-white' : 'bg-gray-100 text-gray-600'}
                                                `}>
                                                    {item.rank}
                                                </div>

                                                {/* Avatar with Initials */}
                                                <div className={`
                                                    w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm
                                                    ${isTopThree ? 'bg-white/20' : getAvatarColor(item.rank)}
                                                `}>
                                                    {getInitials(item.name)}
                                                </div>

                                                {/* Name and Info */}
                                                <div>
                                                    <h3 className={`font-semibold ${isTopThree ? style.text : 'text-gray-900'}`}>
                                                        {item.name}
                                                    </h3>
                                                    <p className={`text-sm ${isTopThree ? style.text + ' opacity-80' : 'text-gray-500'}`}>
                                                        {item.total_visits} kunjungan
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Points */}
                                            <div className="text-right">
                                                <div className={`font-bold text-lg ${isTopThree ? style.text : 'text-gray-900'}`}>
                                                    {item.total_points.toLocaleString()}
                                                </div>
                                                <div className={`text-sm ${isTopThree ? style.text + ' opacity-80' : 'text-gray-500'}`}>
                                                    XP
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {rankings.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Belum Ada Ranking
                                </h3>
                                <p className="text-gray-500">
                                    Ranking akan muncul setelah ada anak-anak yang berkunjung ke perpustakaan.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Info Card */}
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-blue-900 mb-1">
                                    Informasi Poin
                                </h3>
                                <div className="text-sm text-blue-800 space-y-1">
                                    <p>• Hanya anak-anak yang mendapat poin</p>
                                    <p>• Ranking diperbarui secara real-time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CompanyLayout>
    );
};

export default Index;