import React from 'react';

function CategoryNav({ selectedCategory, setSelectedCategory }) {
  const categories = ['Të Gjitha', 'Elektronika', 'Veshje', 'Libra', 'Shtëpi'];

  return (
    <div className="bg-gray-100 border-b">
      <div className="container mx-auto px-4 py-4 flex gap-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryNav;