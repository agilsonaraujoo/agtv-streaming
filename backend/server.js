const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'AGTV',
    version: '1.0.0',
    url: 'https://agtv.com'
  }
});

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Middleware
app.use(cors());

// Rota para criar sessão de checkout
app.post('/create-checkout-session', cors(), async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      metadata: {
        user_id: req.body.user_id,
        plan_type: req.body.plan_type
      },
    });

    res.json({ id: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar sessão do portal do cliente
app.post('/create-portal-session', async (req, res) => {
  try {
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: process.env.STRIPE_SUCCESS_URL,
    });

    res.redirect(303, portalSession.url);
  } catch (error) {
    console.error('Erro ao criar portal:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook para eventos do Stripe
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.WEBHOOK_SECRET;

  try {
    let event;
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = req.body;
    }

    const eventType = event.type;
    const data = event.data.object;

    switch (eventType) {
      case 'customer.subscription.trial_will_end':
        console.log('Trial will end for subscription:', data.id);
        break;
      case 'customer.subscription.deleted':
        console.log('Subscription deleted:', data.id);
        break;
      case 'customer.subscription.created':
        console.log('Subscription created:', data.id);
        break;
      case 'customer.subscription.updated':
        console.log('Subscription updated:', data.id);
        break;
      case 'entitlements.active_entitlement_summary.updated':
        console.log('Entitlement summary updated:', data.id);
        break;
      default:
        console.log(`Unhandled event type ${eventType}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// Rota para verificar sessão
app.get('/verify-session', async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Sessão não foi paga' });
    }

    res.json({ valid: true });
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    res.status(400).json({ error: error.message });
  }
});

// Rota para confirmar pagamento
app.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Rota para criar sessão do portal do cliente
app.post('/create-portal-session', async (req, res) => {
  const { sessionId } = req.body;

  try {
    // Primeiro verifica se a sessão existe e é válida
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Sessão não foi paga' });
    }

    // Cria a sessão do portal do cliente
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: session.customer,
      return_url: process.env.STRIPE_SUCCESS_URL,
    });

    res.json({ url: portalSession.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para verificar sessão
app.get('/verify-session', async (req, res) => {
  const { session_id } = req.query;

  try {
    // Verifica se a sessão existe e é válida
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Sessão não foi paga' });
    }

    res.json({ valid: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para confirmar pagamento
app.post('/confirm-payment', async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    res.json({ paymentIntent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
