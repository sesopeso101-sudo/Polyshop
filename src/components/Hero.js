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
                <span className="text-sm font-medium text-blue-600">Mirë se vini në Polyshop Shqipëri</span>
              </div>
              <h1 className="heading-1">Bli Teknologjinë Më të Fundit me Çmimet Më të Mira</h1>
              <p className="subheading max-w-lg">Zbulo smartphone, laptopë, aksesorë dhe produkte teknologjike të përzgjedhura me kujdes. Polyshop sjell blerje të sigurta, dërgesë të shpejtë dhe cilësi të garantuar në gjithë Shqipërinë.</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary inline-flex items-center justify-center gap-2 group">
                Bli Tani
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </button>
              <button className="btn-secondary inline-flex items-center justify-center gap-2">
                Shiko Produktet
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div>
                <div className="text-3xl font-bold text-slate-900">10,000+</div>
                <div className="text-sm text-slate-600">Klientë të Kënaqur</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">5,000+</div>
                <div className="text-sm text-slate-600">Produkte në Stok</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">24/7</div>
                <div className="text-sm text-slate-600">Porosi Online</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 md:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative card-lg h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">Ofertat e Javës</div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">-25%</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">iPhone 15 Pro Max - Zbritje Sezonale</span>
                    <span className="text-lg font-semibold text-blue-600">85%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs text-slate-600">
                Përditësuar para 2 minutash • 1,247 blerjet këtë ditë • $156.8K në shitje
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
