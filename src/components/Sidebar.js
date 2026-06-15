import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Sidebar = ({ darkMode }) => {
  const trendingItems = [
    { name: 'Gaming PC RTX 4090', change: '+15%', trend: 'up' },
    { name: 'iPhone 17 Pro', change: '+12%', trend: 'up' },
    { name: 'Rolex Daytona', change: '+8%', trend: 'up' },
    { name: 'Mercedes G63 AMG', change: '+7%', trend: 'up' },
    { name: 'Kamera Sony A7R V', change: '+9%', trend: 'up' }
  ];

  const winners = [
    { name: 'Gaming PC RTX 4090', change: '+15%' },
    { name: 'Kamera Sony A7R V', change: '+9%' },
    { name: 'Rolex Daytona', change: '+8%' }
  ];

  const losers = [
    { name: 'Vilë Luksoze me Qira', change: '-2%' },
    { name: 'Audi RS7', change: '-1%' }
  ];

  const SidebarSection = ({ title, items }) => (
    <motion.div 
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-5 card-shadow mb-6`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            } transition-colors cursor-pointer`}
            whileHover={{ x: 4 }}
          >
            <span className="text-sm font-medium truncate">{item.name}</span>
            <span className={`flex items-center space-x-1 font-semibold text-sm ${
              item.change.includes('+')
                ? 'text-green-500'
                : 'text-red-500'
            }`}>
              {item.change.includes('+') ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{item.change}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <SidebarSection title="Në Trend" items={trendingItems} />
      <SidebarSection title="Fituesit Kryesorë" items={winners} />
      <SidebarSection title="Humbësit Kryesorë" items={losers} />
    </div>
  );
};

export default Sidebar;
