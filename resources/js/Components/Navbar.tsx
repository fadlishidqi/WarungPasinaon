import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
       setIsOpen(!isOpen);
   };

   const scrollToSection = (sectionId: string) => {
       const element = document.getElementById(sectionId);
       if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
       }
       setIsOpen(false); // Close mobile menu after click
   };

   return (
       <nav className="bg-white shadow-lg sticky top-0 z-50">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center h-16">
                   {/* Logo */}
                   <div className="flex-shrink-0 flex items-center">
                       <Link href="/" className="text-2xl font-bold text-green-600">
                           Warung Pasinaon
                       </Link>
                   </div>

                   {/* Desktop Menu */}
                   <div className="hidden md:block">
                       <div className="ml-10 flex items-baseline space-x-8">
                           <button 
                               onClick={() => scrollToSection('home')}
                               className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                           >
                               Home
                           </button>
                           <button 
                               onClick={() => scrollToSection('about')}
                               className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                           >
                               Tentang Kami
                           </button>
                           <Link 
                               href="/kegiatan" 
                               className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                           >
                               Kegiatan
                           </Link>
                           <Link 
                               href="/buku-digital" 
                               className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                           >
                               Buku Digital
                           </Link>
                           <Link 
                               href="/ranking" 
                               className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                           >
                               Ranking
                           </Link>
                       </div>
                   </div>

                   {/* Mobile menu button */}
                   <div className="md:hidden">
                       <button
                           onClick={toggleMenu}
                           className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                       >
                           <span className="sr-only">Open main menu</span>
                           {!isOpen ? (
                               <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                               </svg>
                           ) : (
                               <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                               </svg>
                           )}
                       </button>
                   </div>
               </div>
           </div>

           {/* Mobile Menu */}
           {isOpen && (
               <div className="md:hidden">
                   <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                       <button
                           onClick={() => scrollToSection('home')}
                           className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 w-full text-left"
                       >
                           Home
                       </button>
                       <button
                           onClick={() => scrollToSection('about')}
                           className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 w-full text-left"
                       >
                           Tentang Kami
                       </button>
                       <Link
                           href="/kegiatan"
                           className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                           onClick={() => setIsOpen(false)}
                       >
                           Kegiatan
                       </Link>
                       <Link
                           href="/buku-digital"
                           className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                           onClick={() => setIsOpen(false)}
                       >
                           Buku Digital
                       </Link>
                       <Link
                           href="/ranking"
                           className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                           onClick={() => setIsOpen(false)}
                       >
                           Ranking
                       </Link>
                   </div>
               </div>
           )}
       </nav>
   );
};

export default Navbar;