import React from 'react';
import { ArrowRight } from 'lucide-react';

function CTA() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-16 md:px-16 md:py-24">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Gati për të Filluar Tregtimin?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">Bashkohuni me mijëra tregtarë që parashikojnë të ardhmen me Polyshop. Krijo llogarinë tuaj në sekonda dhe fillo tregtimin sot.</p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-200 inline-flex items-center gap-2 group">
              Fillo Tani Falas
              <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;