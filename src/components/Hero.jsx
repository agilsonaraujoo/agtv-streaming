// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section
      id="home"
      className="text-white flex items-center justify-center min-h-screen pt-20 pb-10 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/download.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
      }}
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up">
          Assista aos Melhores Canais, Filmes e Séries <br className="hidden md:inline"/> Em Um Só Lugar!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up delay-200">
          A AGTV tem um presente para você e sua família. <br className="hidden md:inline"/> Faça um teste grátis e divirta-se!
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-400">
          <a href="#planos" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg sm:text-xl transition duration-300 shadow-lg transform hover:scale-105">
            Contrate Agora!
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
