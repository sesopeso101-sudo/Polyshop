import React from 'react';
import { motion } from 'framer-motion';

const CategoryNav = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    'Të Gjitha',
    'Elektronikë',
    'Telefona',
    'Makina',
    'Pasuri të Paluajtshme',
    'Luks',
    'Shërbime',
    'Modë',
    'Gaming',
    'Kripto',
    'Në Trend'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto space-x-2 py-3 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
