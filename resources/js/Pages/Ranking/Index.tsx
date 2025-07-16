// resources/js/Pages/Ranking/Index.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import LoadingImage from '@/Components/LoadingImage';
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
    const [isVisible, setIsVisible] = useState(false);

    // Trigger visibility animations
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Memoized medal icon function
    const getMedalIcon = useCallback((rank: number) => {
        switch (rank) {
            case 1:
                return (
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-2xl">🥇</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">1</span>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-xl">🥈</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">2</span>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-lg">🥉</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">3</span>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-2 border-blue-300">
                        <span className="text-sm font-bold text-blue-700">{rank}</span>
                    </div>
                );
        }
    }, []);

    // Memoized style function
    const getRankCardStyle = useCallback((rank: number) => {
        switch (rank) {
            case 1:
                return {
                    container: 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 shadow-yellow-100',
                    glow: 'shadow-2xl',
                    scale: 'scale-105'
                };
            case 2:
                return {
                    container: 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 shadow-gray-100',
                    glow: 'shadow-xl',
                    scale: 'scale-102'
                };
            case 3:
                return {
                    container: 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 shadow-orange-100',
                    glow: 'shadow-xl',
                    scale: 'scale-102'
                };
            default:
                return {
                    container: 'bg-white border-gray-100',
                    glow: 'shadow-sm',
                    scale: ''
                };
        }
    }, []);

    // Memoized avatar function
    const getRandomAvatarId = useCallback((name: string) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            const char = name.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash) % 100 + 1;
    }, []);

    // Memoize formatted dates
    const formattedDates = useMemo(() => {
        return rankings.reduce((acc, item) => {
            acc[item.rank] = new Date(item.last_visit).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: window.innerWidth < 640 ? undefined : 'numeric'
            });
            return acc;
        }, {} as Record<number, string>);
    }, [rankings]);

    return (
        <CompanyLayout>
            <Head title="Ranking Anak-anak - Warung Pasinaon" />

            {/* Simplified background - only on desktop */}
            <div className="hidden lg:block fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-1000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
            </div>
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className={`text-center mb-12 transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <div className="relative inline-block">
                            <h1 className="relative z-10 text-5xl mt-6 lg:text-6xl font-bold text-gray-900 leading-tight">
                                🏆 Leaderboard Champions
                            </h1>
                            <span className="absolute -bottom-0.5 left-0 right-0 h-12 bg-gradient-to-r from-pink-200 via-rose-200 to-white rounded-lg transform -rotate-1 z-0"></span>
                            {/* Remove bouncing animation for performance */}
                            <div className="absolute -top-2 -right-2 z-20">
                                <span className="text-2xl">✨</span>
                            </div>
                        </div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
                            Semakin aktif kamu berpartisipasi dalam kegiatan literasi, semakin besar peluangmu untuk naik peringkat di leaderboard!
                        </p>
                    </div>

                    {/* Top 3 Podium */}
                    {rankings.length >= 3 && (
                        <div className={`mb-12 transition-all duration-700 delay-200 ${
                            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                            <div className="flex justify-center items-end space-x-4 md:space-x-8">
                                {/* 2nd Place */}
                                <div className={`text-center transition-all duration-700 delay-400 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}>
                                    <div className="mb-4">
                                        <LoadingImage
                                            src={`https://avatar.iran.liara.run/public/${getRandomAvatarId(rankings[1]?.name)}`}
                                            alt={rankings[1]?.name}
                                            className="w-16 h-16 rounded-full border-4 border-gray-300 shadow-lg mx-auto mb-2 hover:scale-110 transition-transform duration-300"
                                        />
                                        {getMedalIcon(2)}
                                    </div>
                                    <div className="bg-gradient-to-t from-gray-300 to-gray-200 h-20 w-28 rounded-t-2xl flex flex-col justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className="text-gray-900 font-bold text-xs">{rankings[1]?.name}</div>
                                        <div className="text-gray-600 text-xs font-medium">{rankings[1]?.total_points} XP</div>
                                    </div>
                                </div>

                                {/* 1st Place */}
                                <div className={`text-center transition-all duration-700 delay-300 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}>
                                    <div className="mb-4">
                                        <LoadingImage
                                            src={`https://avatar.iran.liara.run/public/${getRandomAvatarId(rankings[0]?.name)}`}
                                            alt={rankings[0]?.name}
                                            className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-xl mx-auto mb-2 hover:scale-110 transition-transform duration-300"
                                        />
                                        {getMedalIcon(1)}
                                    </div>
                                    <div className="bg-gradient-to-t from-yellow-400 to-yellow-300 h-28 w-32 rounded-t-2xl flex flex-col justify-center items-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                        <div className="text-gray-900 font-bold text-sm">{rankings[0]?.name}</div>
                                        <div className="text-yellow-800 text-sm font-medium">{rankings[0]?.total_points} XP</div>
                                        <div className="text-xs text-yellow-700">👑 Champion</div>
                                    </div>
                                </div>

                                {/* 3rd Place */}
                                <div className={`text-center transition-all duration-700 delay-500 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}>
                                    <div className="mb-4">
                                        <LoadingImage
                                            src={`https://avatar.iran.liara.run/public/${getRandomAvatarId(rankings[2]?.name)}`}
                                            alt={rankings[2]?.name}
                                            className="w-14 h-14 rounded-full border-4 border-orange-300 shadow-lg mx-auto mb-2 hover:scale-110 transition-transform duration-300"
                                        />
                                        {getMedalIcon(3)}
                                    </div>
                                    <div className="bg-gradient-to-t from-orange-400 to-orange-300 h-16 w-24 rounded-t-2xl flex flex-col justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className="text-gray-900 font-bold text-xs">{rankings[2]?.name}</div>
                                        <div className="text-orange-700 text-xs font-medium">{rankings[2]?.total_points} XP</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                   {/* Full Rankings List */}
                    <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden transition-all duration-700 delay-600 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <div className="p-4 md:p-6 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300">
                            <h2 className="text-xl md:text-2xl font-bold text-white flex flex-col sm:flex-row sm:items-center gap-2">
                                <span>📊 Complete Rankings</span>
                                <span className="text-xs md:text-sm bg-white/20 px-2 md:px-3 py-1 rounded-full self-start sm:self-auto">
                                    {rankings.length} participants
                                </span>
                            </h2>
                        </div>
                        
                        <div className="divide-y divide-gray-100">
                            {rankings.map((item, index) => {
                                const style = getRankCardStyle(item.rank);
                                const isTopThree = item.rank <= 3;
                                const delay = `delay-${Math.min(index * 50 + 700, 1000)}`;
                                
                                return (
                                    <div 
                                        key={item.rank}
                                        className={`p-4 md:p-6 transition-all duration-300 hover:bg-gray-50/50 hover:scale-105 
                                                   ${style.container} ${style.glow} ${isTopThree ? style.scale : ''}
                                                   animate-fade-in-up ${delay}`}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            {/* Left Section - Medal, Avatar, Name */}
                                            <div className="flex items-center space-x-3 md:space-x-6">
                                                {/* Medal/Rank */}
                                                <div className="flex-shrink-0">
                                                    {getMedalIcon(item.rank)}
                                                </div>

                                                {/* Avatar */}
                                                <div className="flex-shrink-0">
                                                    <LoadingImage
                                                        src={`https://avatar.iran.liara.run/public/${getRandomAvatarId(item.name)}`}
                                                        alt={item.name}
                                                        className={`w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg border-2 md:border-4 
                                                                   hover:scale-110 transition-transform duration-300 ${
                                                            isTopThree ? 'border-white' : 'border-gray-200'
                                                        }`}
                                                    />
                                                </div>

                                                {/* Name and Info */}
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 truncate">
                                                        {item.name}
                                                        {item.rank <= 3 && (
                                                            <span className="ml-2 text-base md:text-lg">
                                                                {item.rank === 1 ? '👑' : item.rank === 2 ? '🥈' : '🥉'}
                                                            </span>
                                                        )}
                                                    </h3>
                                                    
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <span>📚</span>
                                                            <span>{item.total_visits} kunjungan</span>
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <span>📅</span>
                                                            <span className="truncate">
                                                                {formattedDates[item.rank]}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Section - Points */}
                                            <div className="text-center sm:text-right flex-shrink-0">
                                                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-950 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300">
                                                    {item.total_points.toLocaleString()}
                                                </div>
                                                <div className="text-xs md:text-sm text-gray-500 font-medium">
                                                    XP Points
                                                </div>
                                                {isTopThree && (
                                                    <div className="inline-block mt-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                                                        TOP {item.rank}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Mobile: Additional info bar */}
                                        <div className="block sm:hidden mt-3 pt-3 border-t border-gray-100">
                                            <div className="flex justify-between items-center text-xs text-gray-500">
                                                <span>Ranking #{item.rank}</span>
                                                <span>Total: {item.total_points.toLocaleString()} XP</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Empty State */}
                        {rankings.length === 0 && (
                            <div className="text-center py-12 md:py-20 px-4 animate-fade-in-up">
                                <div className="text-6xl md:text-8xl mb-4 md:mb-6">📚</div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                                    Belum Ada Champion
                                </h3>
                                <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                                    Ranking akan muncul setelah ada anak-anak yang berkunjung ke perpustakaan.
                                    Jadilah yang pertama! 🚀
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </CompanyLayout>
    );
};

export default Index;