import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

function Navbar({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ⓟ</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Polyshop</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Markets</a>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Trending</a>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">How It Works</a>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition">Docs</a>
          </div>

          {/* Search & Auth */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search markets..." 
                className="bg-slate-100 pl-10 pr-4 py-2 rounded-lg text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-slate-50 focus:ring-2 focus:ring-blue-500 transition" 
              />
            </div>
            <button className="btn-outline py-2 px-4 text-sm">Sign In</button>
            <button className="btn-primary py-2 px-4 text-sm">Start Trading</button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 space-y-4">
            <a href="#" className="block text-sm text-slate-600 hover:text-slate-900">Markets</a>
            <a href="#" className="block text-sm text-slate-600 hover:text-slate-900">Trending</a>
            <a href="#" className="block text-sm text-slate-600 hover:text-slate-900">How It Works</a>
            <button className="btn-primary w-full text-sm">Start Trading</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
