// resources/js/Pages/Ranking/Index.tsx
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface Participant {
    rank: number;
    name: string;
    total_points?: number;
    total_visits: number;
    last_visit: string | null;
    type: 'child' | 'general';
}

interface Props {
    childRankings: Participant[];
    generalStats: Participant[];
    totalChildren: number;
    totalGeneral: number;
    totalPoints: number;
}

export default function RankingIndex({ 
    childRankings, 
    generalStats, 
    totalChildren, 
    totalGeneral, 
    totalPoints 
}: Props) {
    const [activeTab, setActiveTab] = useState<'children' | 'general'>('children');

    // Generate avatar colors based on name
    const getAvatarColor = (name: string, rank: number) => {
        const colors = [
            'bg-yellow-500', 'bg-red-500', 'bg-blue-500', 'bg-orange-500', 
            'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500',
            'bg-teal-500', 'bg-cyan-500', 'bg-lime-500', 'bg-amber-500'
        ];
        
        if (rank === 1) return 'bg-yellow-500'; // Gold for #1
        if (rank === 2) return 'bg-gray-400';   // Silver for #2
        if (rank === 3) return 'bg-orange-600'; // Bronze for #3
        
        return colors[name.length % colors.length];
    };

    // Get initials from name
    const getInitials = (name: string) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    };

    // Get rank style
    const getRankStyle = (rank: number) => {
        if (rank <= 3) {
            return {
                1: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold',
                2: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white font-bold', 
                3: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold'
            }[rank];
        }
        return 'bg-gray-100 text-gray-700 font-semibold';
    };

    return (
        <>
            <Head title="Ranking Perpustakaan" />
            <Navbar />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-white shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                🏆 Ranking Perpustakaan
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Papan peringkat berdasarkan poin dan kunjungan
                            </p>
                            
                            {/* Tab Navigation */}
                            <div className="flex justify-center space-x-1 bg-gray-100 p-1 rounded-lg max-w-md mx-auto">
                                <button
                                    onClick={() => setActiveTab('children')}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                        activeTab === 'children'
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Anak-anak ({totalChildren})
                                </button>
                                <button
                                    onClick={() => setActiveTab('general')}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                        activeTab === 'general'
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Pengunjung Umum ({totalGeneral})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Statistics Cards */}
                    {activeTab === 'children' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                                <div className="text-2xl font-bold text-blue-600">{totalChildren}</div>
                                <div className="text-sm text-gray-600">Total Anak</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                                <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
                                <div className="text-sm text-gray-600">Total Poin</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                                <div className="text-2xl font-bold text-purple-600">
                                    {childRankings.length > 0 ? Math.round(totalPoints / childRankings.length) : 0}
                                </div>
                                <div className="text-sm text-gray-600">Rata-rata Poin</div>
                            </div>
                        </div>
                    )}

                    {/* Ranking List */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                {activeTab === 'children' ? '🌟 Ranking Berdasarkan Poin' : '📊 Statistik Kunjungan'}
                            </h2>
                            
                            <div className="space-y-3">
                                {(activeTab === 'children' ? childRankings : generalStats).map((participant) => (
                                    <div 
                                        key={`${activeTab}-${participant.rank}`}
                                        className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <div className="flex items-center space-x-4">
                                            {/* Rank Number */}
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getRankStyle(participant.rank)}`}>
                                                {participant.rank}
                                            </div>
                                            
                                            {/* Avatar */}
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(participant.name, participant.rank)}`}>
                                                {getInitials(participant.name)}
                                                {/* Level indicator for top performers */}
                                                {participant.rank <= 3 && activeTab === 'children' && (
                                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                                                        {participant.rank === 1 ? '👑' : 
                                                         participant.rank === 2 ? '🥈' : '🥉'}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Name and Info */}
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    {participant.name}
                                                    {participant.rank <= 3 && (
                                                        <span className="ml-2 text-xs">
                                                            {participant.rank === 1 ? '🥇' :
                                                             participant.rank === 2 ? '🥈' : '🥉'}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {participant.total_visits} kunjungan
                                                    {participant.last_visit && ` • ${participant.last_visit}`}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Points/Visits */}
                                        <div className="text-right">
                                            <div className="font-bold text-xl">
                                                {activeTab === 'children' ? (
                                                    <span className="text-green-600">{participant.total_points}</span>
                                                ) : (
                                                    <span className="text-blue-600">{participant.total_visits}</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {activeTab === 'children' ? 'Poin' : 'Kunjungan'}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Empty State */}
                                {(activeTab === 'children' ? childRankings : generalStats).length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">
                                            {activeTab === 'children' ? '🏆' : '📊'}
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            Belum Ada Data
                                        </h3>
                                        <p className="text-gray-500">
                                            {activeTab === 'children' 
                                                ? 'Belum ada anak yang mengisi daftar hadir perpustakaan'
                                                : 'Belum ada pengunjung umum yang terdaftar'
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                        <h3 className="text-lg font-semibold mb-3">💡 Cara Kerja Sistem Poin</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
                            <div>
                                <h4 className="font-medium text-white mb-2">Untuk Anak-anak:</h4>
                                <ul className="space-y-1 text-sm">
                                    <li>• Setiap berkunjung ke perpustakaan: +50 poin</li>
                                    <li>• Poin bonus dari admin untuk prestasi khusus</li>
                                    <li>• Masuk dalam ranking berdasarkan total poin</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-2">Untuk Pengunjung Umum:</h4>
                                <ul className="space-y-1 text-sm">
                                    <li>• Tidak mendapat poin otomatis</li>
                                    <li>• Dihitung berdasarkan frekuensi kunjungan</li>
                                    <li>• Statistik kunjungan tercatat untuk referensi</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    );
}