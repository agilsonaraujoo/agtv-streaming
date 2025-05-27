// src/components/Header.jsx
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      const href = e.currentTarget.getAttribute('href');
      
      // Se o link não começar com #, não faz nada (é um link externo)
      if (!href.startsWith('#')) {
        return;
      }

      e.preventDefault();
      const targetId = href;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    };

    // Adiciona o listener para todos os links que começam com #
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    // Cleanup
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  // Substitua esta URL pela sua imagem de logo.
  // Se estiver na pasta 'public', use '/nome-da-imagem.jpg'
  // Se importada de 'src/assets', use a variável importada.
  const logoSrc = "/agtv.jpg"; // Logo AGTV na pasta public

  return (
    <header className="bg-gray-900 text-white shadow-lg fixed w-full z-50">
      <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <img
            src={logoSrc} // Usando a variável para a imagem
            alt="Logo AGTV"
            className="h-12 w-auto rounded-full border-2 border-blue-500 hover:border-blue-600 transition-all duration-300 shadow-lg"
          />
        </a>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
            <svg className="h-8 w-8" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden md:flex space-x-4 sm:space-x-6 lg:space-x-8">
          <a href="#home" className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">Início</a>
          <a href="#servicos" className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">Serviços</a>
          <a href="#planos" className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">Planos</a>
          <a href="#trending" className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">Em Alta 🔥</a>
          <a href="#recomendacoes" className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">Recomendações ✨</a>
          <a href="#faq" className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">FAQ</a>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <div className="flex flex-col items-center space-y-4">
            <a href="#home" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">Início</a>
            <a href="#servicos" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">Serviços</a>
            <a href="#planos" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">Planos</a>
            <a href="#trending" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">Em Alta 🔥</a>
            <a href="#recomendacoes" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">Recomendações ✨</a>
            <a href="#faq" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white transition duration-300">FAQ</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
