import React from 'react';

const SimpleStripeCheckoutButton = ({ plan }) => {
  const handleCheckout = async () => {
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.id;
      } else {
        console.error('Erro ao criar sessão de checkout:', data.error);
      }
    } catch (error) {
      console.error('Erro ao processar o checkout:', error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 shadow-lg transform hover:scale-105"
    >
      Assinar Agora
    </button>
  );
};

export default SimpleStripeCheckoutButton;
