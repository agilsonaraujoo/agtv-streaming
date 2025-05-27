// src/components/Features.jsx
import React from 'react';

const Features = () => {
  return (
    <section id="servicos" className="bg-gray-800 text-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white mb-12">
          Assista TUDO na AGTV
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="bg-gray-900 rounded-lg shadow-xl p-8 transform transition-transform hover:scale-105 duration-300">
            <div className="text-indigo-400 mb-6">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h4l-1-1v-3.25m-2.25 0h3.5m-3.5 0c.879 0 1.741.17 2.503.483l-2.503-4.503zM12 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Qualidade Impecável</h3>
            <p className="text-gray-300">
              Temos planos em todas as resoluções: 4K, Full HD, HD e On-Demand. Desfrute de uma experiência visual sem igual.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-900 rounded-lg shadow-xl p-8 transform transition-transform hover:scale-105 duration-300">
            <div className="text-indigo-400 mb-6">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 0A9 9 0 0110 18.364V18a2 2 0 00-2-2h-1a2 2 0 00-2 2v.364m5.636-5.636l3.536-3.536m0 0A9 9 0 005.636 5.636m0 0a9 9 0 0012.728 12.728M12 21a9 9 0 100-18 9 9 0 000 18z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Suporte Dedicado</h3>
            <p className="text-gray-300">
              Nosso suporte está disponível 12/7 para te ajudar com qualquer dúvida ou problema, garantindo sua diversão.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-900 rounded-lg shadow-xl p-8 transform transition-transform hover:scale-105 duration-300">
            <div className="text-indigo-400 mb-6">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Tecnologia Avançada</h3>
            <p className="text-gray-300">
              Trabalhamos com a mais moderna tecnologia de transmissão, com alta definição e sem travamentos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
