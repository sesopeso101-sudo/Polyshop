import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="section-container section-padding">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🛍️</span>
              </div>
              <span className="text-xl font-bold text-white">Polyshop</span>
            </div>
            <p className="text-slate-400 text-sm">Tregu dixhital i Shqipërisë - Cilësia, Besueshmëria, Shërbimi</p>
          </div>

          {/* Produktet */}
          <div>
            <h4 className="font-semibold text-white mb-4">Produktet</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-slate-400 hover:text-white transition">Të Gjitha Produktet</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Në Trend</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Kategoritë</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Ofertat Speciale</button></li>
            </ul>
          </div>

          {/* Kompania */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kompania</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-slate-400 hover:text-white transition">Rreth Nesh</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Blog</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Karrierat</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Lajme</button></li>
            </ul>
          </div>

          {/* Ndihmë */}
          <div>
            <h4 className="font-semibold text-white mb-4">Ndihmë</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-slate-400 hover:text-white transition">Dokumentacioni</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Pyetjet Shpesh</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Mbështetje</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Statusi</button></li>
            </ul>
          </div>

          {/* Juridike */}
          <div>
            <h4 className="font-semibold text-white mb-4">Juridike</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-slate-400 hover:text-white transition">Privatësia</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Kushtet</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Cookie-të</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Sigurimi</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm">&copy; 2026 Polyshop. Të gjitha të drejtat e rezervuara.</p>
          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <button className="text-slate-400 hover:text-white transition">Twitter</button>
            <button className="text-slate-400 hover:text-white transition">Facebook</button>
            <button className="text-slate-400 hover:text-white transition">Instagram</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
