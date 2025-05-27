import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Chave pública do Stripe - substitua pela sua chave real
const stripePromise = loadStripe('pk_test_51RTC1hCyVcsmVej8FLzWkLFjAZ5spTSodXrBInQt0mQ9Ta1RBksPfU6klIMDoatxk8G9P6eg9zu3DgN5x1FLB7D600TSJMNayc');

const StripeCheckoutButton = ({ plan }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm plan={plan} />
    </Elements>
  );
};

export default StripeCheckoutButton;
