import React from 'react';

const Header = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'inscrever', label: 'Inscrever' }
  ];

  return (
    <header className="glass-strong sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Portal <span className="neon-text">EEC</span>
            </h1>
          </div>
          
          <ul className="flex space-x-1 md:space-x-4">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 md:px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-white text-primary shadow-lg scale-105'
                      : 'text-white hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
