// src/components/FAQ.jsx
import React, { useState } from 'react';
import { faqsData } from '../data/faqs';
import { FaWhatsapp } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-xl text-gray-300">
          Tire suas dúvidas e saiba mais sobre a AGTV.
        </p>
      </div>
      <div className="container mx-auto max-w-3xl">
        {faqsData.map((faq, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-md mb-4 overflow-hidden">
            <button
              className="w-full text-left p-6 flex justify-between items-center text-xl font-semibold text-white hover:bg-gray-700 transition duration-300 focus:outline-none"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              {faq.question}
              <svg
                className={`h-6 w-6 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div id={`faq-answer-${index}`} className="p-6 border-t border-gray-700 text-gray-300">
                <p>{faq.answer}</p>
                <div className="mt-4 flex justify-center">
                  <a 
                    href="https://wa.me/5583986913481?text=Ol%C3%A1%2C+tenho+uma+d%C3%BAvida+sobre+AGTV" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                    Fale conosco pelo WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
