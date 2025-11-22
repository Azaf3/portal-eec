import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Eventos from './pages/Eventos';
import Sobre from './pages/Sobre';
import Inscrever from './pages/Inscrever';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'eventos':
        return <Eventos />;
      case 'sobre':
        return <Sobre />;
      case 'inscrever':
        return <Inscrever />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderPage()}
      </main>
      <footer className="glass-strong mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-200">
            © 2025 Portal EEC. Todos os direitos reservados.
          </p>
          <p className="text-gray-300 text-sm mt-2">
            Feito com ❤️ pela comunidade EEC
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
