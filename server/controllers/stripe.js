require("dotenv").config();
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_TEST_SECRET_KEY);

router.get("/customers", async (req, res, next) => {
  try {
    const customers = await stripe.customers.list();

    const dataEnvelope = {
      data: customers,
      total: customers.length,
      isSuccess: true,
    };
    res.send(dataEnvelope);
  } catch (err) {
    next(err);
  }
});

router.get("/locations", async (req, res, next) => {
  try {
    const locations = await stripe.terminal.locations.list();
    res.send({
      data: locations.data,
      total: locations.data.length,
      isSuccess: true,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/readers", async (req, res, next) => {
  try {
    const readers = await stripe.terminal.readers.list();
    res.send({
      data: readers.data,
      total: readers.data.length,
      isSuccess: true,
    });
  } catch (err) {
    next(err);
  }
});

// HERE IS THE FLOW
/**
 * Create a payment intent -> process payment intent -> present payment method -> capture payment intent
 */
router.post("/readers/process-payment", async (req, res, next) => {
  try{
    const { amount, stripe_reader_id } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount,
      payment_method_types: ["card_present"],
      capture_method: "manual",
    });
  
    const reader = await stripe.terminal.readers.processPaymentIntent(
      stripe_reader_id,
      { payment_intent: paymentIntent.id }
    );
  
    res.send({
      data: { reader: reader, payment_intent: paymentIntent },
      total: 2,
      isSuccess: true,
    });
  }
  catch(err){
    next(err);
  }
});

router.post("/readers/simulate-payment", async (req, res, next) => {
  try {
    const { stripe_reader_id } = req.body;
    const reader =
      await stripe.testHelpers.terminal.readers.presentPaymentMethod(
        stripe_reader_id
      );
    res.send({
      data: reader,
      total: 1,
      isSuccess: true,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/capture-payment-intent", async (req, res, next) => {
  try{
    const {payment_intent_id} = req.body;
    const paymentIntent = await stripe.paymentIntents.capture(payment_intent_id);
  
    res.send({
      data:paymentIntent,
      total: 1,
      isSuccess: true,
    });
  }catch(err){
    next(err);
  }
});

router.post('/cancel-payment-intent', async(req,res,next) => {
  try{
    const {payment_intent_id} = req.body;
    const paymentIntent = await stripe.paymentIntents.cancel(payment_intent_id);
  
    res.send({
      data: paymentIntent,
      total: 1,
      isSuccess: true,
    });
  }
  catch(err){
    next(err)
  }
})

module.exports = router;
