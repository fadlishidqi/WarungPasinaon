import React from 'react';
import Navbar from '@/Components/Navbar';

interface CompanyLayoutProps {
    children: React.ReactNode;
}

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
                {children}
            </main>
            {/* Footer bisa ditambahkan di sini */}
        </div>
    );
};

export default CompanyLayout;