// server.js
const express = require('express');
const app = express();
const path = require('path');
const stripe = require('stripe')('sk_test_51Rj8zhIH7XWPimYMENsM5IXNobqhGn6RfB3G6r5JhxmUHi98KER31mb62sFrIncJ5junJxZP0wfq5yP0aUPZhINd00vDbUOtW1'); // Replace with your real secret key

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
        success_url: 'success.html',
        cancel_url: 'index.html',
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
