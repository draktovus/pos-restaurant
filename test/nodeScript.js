require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

stripe.terminal.readers.create({
  location: 'tml_FDqTIgnlajdmGs',
  registration_code: 'simulated-wpe',
  label: 'Baja Blast'
});

/**stripe.terminal.readers.update(
  'tmr_FDqTSgDcZlqEOp',
  {label: 'Grey Ghost'}
);*/