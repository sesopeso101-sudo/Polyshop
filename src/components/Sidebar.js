import React from 'react';

function Sidebar({ darkMode }) {
  return (
    <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className="text-xl font-bold mb-4">Filtrat</h3>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Çmim</h4>
        <input type="range" min="0" max="1000" className="w-full" />
        <div className="text-sm text-gray-500 mt-2">$0 - $1000</div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Vlerësimet</h4>
        {[5, 4, 3, 2, 1].map((stars) => (
          <label key={stars} className="flex items-center gap-2 mb-2">
            <input type="checkbox" />
            <span className="text-sm">{'⭐'.repeat(stars)}</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Shitës</h4>
        <label className="flex items-center gap-2 mb-2">
          <input type="checkbox" /> Polyshop Official
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Partnerë të Verifikuar
        </label>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Zbato Filtrat
      </button>
    </div>
  );
}

export default Sidebar;