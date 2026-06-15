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
                <span className="text-white font-bold">Ⓟ</span>
              </div>
              <span className="text-xl font-bold text-white">Polyshop</span>
            </div>
            <p className="text-slate-400 text-sm">The future of prediction markets in Albania</p>
          </div>

          {/* Markets */}
          <div>
            <h4 className="font-semibold text-white mb-4">Markets</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-slate-400 hover:text-white transition">All Markets</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Trending</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Categories</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Create Market</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-slate-400 hover:text-white transition">About</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Blog</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Careers</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Press</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-slate-400 hover:text-white transition">Documentation</button></li>
              <li><button className="text-slate-400 hover:text-white transition">API Reference</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Support</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Status</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-slate-400 hover:text-white transition">Privacy</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Terms</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Cookies</button></li>
              <li><button className="text-slate-400 hover:text-white transition">Security</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm">&copy; 2024 Polyshop. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <button className="text-slate-400 hover:text-white transition">Twitter</button>
            <button className="text-slate-400 hover:text-white transition">GitHub</button>
            <button className="text-slate-400 hover:text-white transition">Discord</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
