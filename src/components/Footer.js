import React from 'react';

function Footer({ darkMode }) {
  return (
    <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-900'} text-white mt-12`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Rreth Nesh</h4>
            <p className="text-gray-400">Polyshop - Tregu Dixhital i Shqipërisë</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Ndihmë</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-white">Kontakti</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Kthimet</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Ligjore</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-white">Kushtet</a></li>
              <li><a href="#" className="hover:text-white">Privatësia</a></li>
              <li><a href="#" className="hover:text-white">Cookie-t</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Na Ndiqni</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400">Facebook</a>
              <a href="#" className="hover:text-blue-400">Instagram</a>
              <a href="#" className="hover:text-blue-400">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Polyshop. Të gjitha të drejtat e rezervuara.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;