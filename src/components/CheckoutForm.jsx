import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Carrega o Stripe com a chave pública
const stripePromise = loadStripe('pk_test_51RTC1hCyVcsmVej8FLzWkLFjAZ5spTSodXrBInQt0mQ9Ta1RBksPfU6klIMDoatxk8G9P6eg9zu3DgN5x1FLB7D600TSJMNayc');

const CheckoutForm = ({ plan, userId }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          user_id: userId,
          plan_type: plan.type
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redireciona para o checkout do Stripe
        window.location.href = data.id;
      } else {
        setError(data.error || 'Erro ao iniciar a sessão de pagamento');
      }
    } catch (error) {
      setError('Erro ao processar o pagamento');
    } finally {
      setProcessing(false);
    }

    try {
      // O Stripe já lida com o pagamento através da sessão de checkout
      // Não precisamos mais criar o paymentMethod manualmente

      if (cardError) {
        throw cardError;
      }

      // Aqui você faria uma chamada para seu backend para criar uma sessão do Stripe
      // e confirmar o pagamento
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: plan.price * 100, // Stripe usa centavos
          currency: 'brl',
          planId: plan.id,
        }),
      });

      const { clientSecret } = await response.json();

      // Confirma o pagamento
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (confirmError) {
        throw confirmError;
      }

      // Pagamento realizado com sucesso
      alert('Pagamento realizado com sucesso!');
      // Aqui você pode redirecionar para uma página de sucesso
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Detalhes do Pagamento</h3>
      
      <CardElement className="mb-4 w-full" options={{
        style: {
          base: {
            fontSize: '18px',
            color: '#ffffff',
            '::placeholder': {
              color: '#aab7c4',
            },
            padding: '12px 16px',
          },
          invalid: {
            color: '#ffc7ee',
            iconColor: '#ffc7ee',
          },
        },
      }} />

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <button
        type="submit"
        disabled={processing || !stripe}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
      >
        {processing ? 'Processando...' : 'Pagar R$ ' + plan.price}
      </button>
    </form>
  );
};

export default CheckoutForm;
