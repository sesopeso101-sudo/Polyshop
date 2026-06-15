import React from 'react';
import { Search, Zap, Award } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Zbuloni Tregjet',
      description: 'Shfletoni mijëra trege parashikimi në kategori të ndryshme dhe gjeni ngjarjet në të cilat dëshironi të tregtoni.'
    },
    {
      icon: Zap,
      title: 'Vendosni Blerjen Tuaj',
      description: 'Bliherje aksione që përfaqësojnë parashikimin tuaj. Probabiliteti më i lartë = çimi më i ulët. Menaxhimi i thjeshtë i rrezikut.'
    },
    {
      icon: Award,
      title: 'Fitoni Shpërblime',
      description: 'Nëse keni të drejtë, aksionet tuaja vlejnë $1. Tërhiqni fitimin e tuaj në çdo kohë, kudo.'
    },
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-3">Si Funksionon</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Filloni në tre hapa të thjeshtë dhe bashkohuni me mijëra tregtarë në tregjen më transparente të parashikimit në botë</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform -translate-y-1/2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
