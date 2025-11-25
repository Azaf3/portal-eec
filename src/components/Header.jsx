import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';

const Header = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'inscrever', label: 'Inscrever-se' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
        : 'bg-white/80 backdrop-blur-md'
    }`}>
      <nav className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer group"
            aria-label="Voltar ao início"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-md ring-2 ring-[#2B9BB8]/20 group-hover:ring-[#2B9BB8]/40 transition-all">
              <img
                src={logo}
                alt="Logo Portal EEC"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold gradient-brand-text">
              Portal EEC
            </span>
          </button>
          
          <ul className="flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? 'text-[#2B9BB8]'
                      : 'text-gray-700 hover:text-[#2D5A8C]'
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
