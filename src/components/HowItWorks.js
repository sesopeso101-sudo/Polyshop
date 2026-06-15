import React from 'react';
import { Search, ShoppingBag, Award } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Shfletoni Katalogun',
      description: 'Eksploroni ndryshimin e gjerë të produkteve dhe shërbimeve në kategori të ndryshme.'
    },
    {
      icon: ShoppingBag,
      title: 'Shtoni në Shporta',
      description: 'Zgjidh produktet që të pëlqejnë dhe shto në shporta. Pagesa e sigurt dhe e thjeshtë.'
    },
    {
      icon: Award,
      title: 'Merr Porositjen Tuaj',
      description: 'Dorëzim i shpejtë në mbarë Shqipërinë. Nëse nuk jeni të kënaqur, kthim falas në 30 ditë.'
    },
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-3">Si Punon</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Tre hapa të thjeshtë për të blerë produktet dhe shërbime të cilësisë së lartë direkt në shtëpinë tuaj.</p>
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
