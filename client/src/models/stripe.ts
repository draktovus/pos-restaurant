import { ref } from 'vue'
import { api, useSession, addMessage, deleteMessage } from './session'
import type { DataEnvelope, DataListEnvelope } from './fetch'
import type { Users } from './users'

const session = useSession()
export const readersList = ref()

export const locationsList = ref()

export const reader = ref()

// Amount should be computed from cart total.
export const amount = ref()

export const transaction_state = ref('none')

export const currentPaymentIntent = ref()

/**
 * {
      "id": "tmr_FD0uvQNycDMoY3",
      "object": "terminal.reader",
      "action": {
        "failure_code": null,
        "failure_message": null,
        "process_payment_intent": {
          "payment_intent": "pi_3Mz4LjFQz42G1hw30TRiJ9Kh"
        },
        "status": "in_progress",
        "type": "process_payment_intent"
      },
      "device_sw_version": "",
      "device_type": "simulated_wisepos_e",
      "ip_address": "0.0.0.0",
      "label": "Baja Blast",
      "last_seen_at": 1682285038439,
      "livemode": false,
      "location": "tml_FDqTIgnlajdmGs",
      "metadata": {},
      "serial_number": "335fa934-f6ac-4833-a2bc-20d4ec86b7db",
      "status": "online"
    },
 */
export interface StripeReader {
  id: string
  object: string
  action: {
    failure_code: string
    failure_message: string
    process_payment_intent: {
      payment_intent: string
    }
    status: string
    type: string
  }
  device_sw_version: string
  device_type: string
  ip_address: string
  label: string
  last_seen_at: number
  livemode: boolean
  location: string
  metadata: {}
  serial_number: string
  status: string
}

export function getReaders(): Promise<DataListEnvelope<StripeReader>> {
  return api('stripe/readers')
}

/**
 * {
      "id": "tml_FDqTIgnlajdmGs",
      "object": "terminal.location",
      "address": {
        "city": "New Paltz",
        "country": "US",
        "line1": "1234 Main Street",
        "line2": "",
        "postal_code": "94111",
        "state": "NY"
      },
      "display_name": "Virtual Store",
      "livemode": false,
      "metadata": {}
    }
 */
export interface StripeLocation {
  id: string
  object: string
  address: {
    city: string
    country: string
    line1: string
    line2: string
    postal_code: string
    state: string
  }
  display_name: string
  livemode: boolean
  metadata: {}
}

export function getLocations(): Promise<DataListEnvelope<StripeLocation>> {
  return api('stripe/locations')
}

export function payCard(total: number) {
  if (session.user && total !== 0) {
    console.log('Paying with card, user is signed in and cart total is not 0.')
    transaction_state.value = 'loading'
    const amt = Math.floor(total * 100)
    console.log('Amount is' + amt)
    api(
      'stripe/readers/process-payment',
      {
        amount: amt,
        stripe_reader_id: session.user.stripe_data.stripe_reader_id
      },
      'POST'
    )
      .then((response) => {
        console.log('This is the returned payment_intent,', response)
        currentPaymentIntent.value = response.data.payment_intent
      })
      .catch((err) => {
        transaction_state.value = 'none'
      })
    addMessage(
      `Processing payment of ${amt} for reader ${session.user.stripe_data.stripe_reader_id}`,
      'info',
      'cardPaymentProcessing'
    )
  } else {
    if (total === 0) {
      addMessage('There must be something in the cart.', 'warning')
    } else {
      addMessage('You must be logged in to pay card.', 'warning', 'none')
    }
  }
}

export function simulatePayment() {
  if (session.user) {
    console.log('Simulating payment')
    api(
      'stripe/readers/simulate-payment',
      { stripe_reader_id: session.user.stripe_data.stripe_reader_id },
      'POST'
    ).then((res) => {
      console.log(res)
      console.log('Capturing payment now.')
      api('stripe/capture-payment-intent', {
        payment_intent_id: res.data.action.process_payment_intent.payment_intent
      }).then((response) => {
        console.log(response)
        console.log('Payment has been captured. HECK YEAH.')
        addMessage('Payment has been processed. Thanks!', 'success')
        transaction_state.value = 'none'
      })
    })
  } else {
    addMessage('Please sign in to simulate payment.', 'info')
  }
}

export function cancelPayment() {
  if (session.user) {
    console.log('Simulating payment')
    api(
      'stripe/cancel-payment-intent',
      { payment_intent_id: currentPaymentIntent.value.id },
      'POST'
    ).then((response) => {
      console.log(response)
      addMessage('Payment has been canceled', 'danger')
      transaction_state.value = 'none'
    })
  } else {
    addMessage('You must be logged in to cancel a payment.', 'danger')
  }
}

export function updateReader(readerId: string, locationId: string): Promise<DataEnvelope<Users>> {
  return api(
    'users/update/stripe-data',
    {
      ...session.user,
      stripe_data: {
        stripe_location_id: locationId,
        stripe_reader_id: readerId
      }
    },
    'PATCH'
  )
}
