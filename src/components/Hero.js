import React from 'react';
import { ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <section className="section-padding bg-gradient-to-b from-white via-white to-slate-50">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-blue-600">Welcome to Polyshop Albania</span>
              </div>
              <h1 className="heading-1">Trade Real Markets, Predict the Future</h1>
              <p className="subheading max-w-lg">Experience the future of prediction markets. Polyshop brings transparent, decentralized trading to Albania with real-time data, premium charts, and seamless execution.</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary inline-flex items-center justify-center gap-2 group">
                Start Trading Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </button>
              <button className="btn-secondary inline-flex items-center justify-center gap-2">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div>
                <div className="text-3xl font-bold text-slate-900">500K+</div>
                <div className="text-sm text-slate-600">Active Traders</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">$2.4B</div>
                <div className="text-sm text-slate-600">Trading Volume</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">24/7</div>
                <div className="text-sm text-slate-600">Open Markets</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 md:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative card-lg h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">Market Overview</div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">+12.5%</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Bitcoin > $100K by EOY</span>
                    <span className="text-lg font-semibold text-blue-600">72%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs text-slate-600">
                Updated 2 minutes ago • 4,582 traders • $48.2M volume
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;