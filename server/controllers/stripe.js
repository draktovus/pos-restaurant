require("dotenv").config();
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_TEST_SECRET_KEY);

/**
 * stripe.customers
        .create({
          name: req.body.name,
          email: req.body.email,
          source: req.body.stripeToken
        })
 */

router.post("/payment-intent", async (req, res, next) => {
  try {
    const customer = await stripe.customers.retrieve(req.body.customer_id);
    customer
      .then((c) =>
        stripe.paymentIntents.create({
          amount: req.body.amount * 100,
          currency: "usd",
          customer: c.id,
          payment_method: req.body.payment_method,
          description: "test charge",
        })
      )
      .then(() => {
        const dataEnvelope = {
          data: "Charge was successful",
          total: 1,
          isSuccess: true,
        };
        res.send(dataEnvelope);
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
