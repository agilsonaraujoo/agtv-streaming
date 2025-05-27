// src/components/Pricing.jsx
import React from 'react';
import { plans } from '../data/pricingPlans'; // Importa os dados dos planos


const Pricing = () => {
  return (
    <section id="planos" className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-4">
          Escolha o Plano Ideal para Você
        </h2>
        <p className="text-xl text-gray-300">
          Diversão sem limites ao seu alcance.
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col transform transition-transform hover:scale-105 duration-300 relative ${plan.isPopular ? 'border-2 border-indigo-500' : ''}`}
          >
            {plan.isPopular && (
              <span className="absolute top-0 right-0 bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</span>
            )}
            <h3 className="text-2xl font-bold text-indigo-400 mb-4">{plan.name}</h3>
            <p className="text-gray-400 mb-6 flex-grow">{plan.description}</p>
            <div className="text-5xl font-extrabold text-white mb-6">
              R$ {plan.price.split(',')[0]}<span className="text-3xl text-gray-400">,{plan.price.split(',')[1]}</span>
            </div>
            <ul className="text-lg text-gray-300 space-y-3 flex-grow mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => window.open(plan.whatsappUrl, '_blank')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 shadow-lg transform hover:scale-105"
            >
              Fale no WhatsApp
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
