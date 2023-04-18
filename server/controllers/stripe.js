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

/** Test customer object
 * {
"id": "cus_NjTkC0kQAg501H",
"object": "customer",
"address": null,
"balance": 0,
"created": 1681771504,
"currency": null,
"default_source": null,
"delinquent": false,
"description": "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
"discount": null,
"email": null,
"invoice_prefix": "B1E7B2F8",
"invoice_settings": {
"custom_fields": null,
"default_payment_method": null,
"footer": null,
"rendering_options": null
},
"livemode": false,
"metadata": {},
"name": null,
"next_invoice_sequence": 1,
"phone": null,
"preferred_locales": [],
"shipping": null,
"tax_exempt": "none",
"test_clock": null
}
 */

/** location id
 * tml_FDqTIgnlajdmGs
 * 
 * {
    "id": "tml_FDqTIgnlajdmGs",
    "object": "terminal.location",
    "address": {
      "city": "San Francisco",
      "country": "US",
      "line1": "1234 Main Street",
      "line2": "",
      "postal_code": "94111",
      "state": "CA"
    },
 */

router.get('/', async (req, res, next) => {
  try {
    const customers = await stripe.customers.list()

    const dataEnvelope = {
      data: customers,
      total: customers.length,
      isSuccess: true,
    }
    res.send(dataEnvelope)
  }
  catch (err) {
    next(err)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    const customer = await stripe.customers.create({
      description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
    });
    res.send(customer)

  } catch (err) {
    next(err)
  }

})

router.post("/payment-intent", async (req, res, next) => {
  try {
    stripe.customers.retrieve(req.body.customer_id)
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

router.post('/create-location', async(req,res,next)=>{
  const location = await stripe.terminal.locations.create({
    display_name: 'My First Store',
    address: {
      line1: '1234 Main Street',
      city: 'San Francisco',
      postal_code: '94111',
      state: 'CA',
      country: 'US',
    },
  });
  const dataEnvelope = {
    data:location,
    total: 1,
    isSuccess:true,
  }
  res.send(dataEnvelope)
})

/** Stripe Simulated reader
 * id: tmr_FDqTSgDcZlqEOp
 * {
    "id": "tmr_FDqTSgDcZlqEOp",
    "object": "terminal.reader",
    "action": null,
    "device_sw_version": "",
    "device_type": "simulated_wisepos_e",
    "ip_address": "0.0.0.0",
    "label": "simulated-wpe-02b0e43e-c454-4d17-ab29-38afee8e23df",
    "last_seen_at": 1681772494590,
    "livemode": false,
    "location": "tml_FDqTIgnlajdmGs",
    "metadata": {},
    "serial_number": "02b0e43e-c454-4d17-ab29-38afee8e23df",
    "status": "online"
  },
 */

router.post('/create-reader', async(req,res,next)=>{
  const reader = await stripe.terminal.readers.create({
    location: 'tml_FDqTIgnlajdmGs',
    registration_code: 'simulated-wpe',
  });
  const dataEnvelope = {
    data: reader,
    total: 1,
    isSuccess: true,
  }
  res.send(dataEnvelope);
})

// HERE IS THE FLOW
/**
 * Create a payment intent -> process payment intent -> present payment method -> capture payment intent
 */
router.post('/process-payment-intent', async(req,res,next)=>{
  const payIntent = req.body

  const reader = await stripe.terminal.readers.processPaymentIntent(
    'tmr_FDqTSgDcZlqEOp',
    {payment_intent: payIntent.id}
  )  

  res.send(reader)
})

router.post('/present-payment-method', async(req,res,next)=>{
  const reader2 = await stripe.testHelpers.terminal.readers.presentPaymentMethod('tmr_FDqTSgDcZlqEOp');

  const paymentIntent = await stripe.paymentIntents.retrieve('pi_3My1KMFQz42G1hw30T7RRIlI')
})


router.post('/capture-payment-intent', async(req,res,next)=>{
  const payIntent = req.body
  const paymentIntent = await stripe.paymentIntents.capture(payIntent.id);

  res.send(paymentIntent)
})

/** example result
 * {
  "id": "pi_3My1KMFQz42G1hw30T7RRIlI",
  "object": "payment_intent",
  "amount": 1000,
  "amount_capturable": 1000,
  "amount_details": {
    "tip": {}
  },
  "amount_received": 0,
  "application": null,
  "application_fee_amount": null,
  "automatic_payment_methods": null,
  "canceled_at": null,
  "cancellation_reason": null,
  "capture_method": "manual",
  "client_secret": "pi_3My1KMFQz42G1hw30T7RRIlI_secret_pWCMyjPYoVavyngEDlgPPNOtQ",
  "confirmation_method": "automatic",
  "created": 1681773558,
  "currency": "usd",
  "customer": null,
  "description": null,
  "invoice": null,
  "last_payment_error": null,
  "latest_charge": "ch_3My1KMFQz42G1hw30JmcBm8r",
  "livemode": false,
  "metadata": {},
  "next_action": null,
  "on_behalf_of": null,
  "payment_method": "pm_1My1RLFQz42G1hw31mQuZFJK",
  "payment_method_options": {
    "card_present": {
      "request_extended_authorization": false,
      "request_incremental_authorization_support": false
    }
  },
  "payment_method_types": [
    "card_present"
  ],
  "processing": null,
  "receipt_email": null,
  "review": null,
  "setup_future_usage": null,
  "shipping": null,
  "source": null,
  "statement_descriptor": null,
  "statement_descriptor_suffix": null,
  "status": "requires_capture",
  "transfer_data": null,
  "transfer_group": null
}
 */

module.exports = router;
