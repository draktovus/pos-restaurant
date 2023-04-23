import { computed, ref } from 'vue'
import { api } from './session'
import type { DataListEnvelope } from './fetch'

export const readersList = ref()

export const locationsList = ref()

export const reader = ref()

// Amount should be computed from cart total.
export const amount = ref()

export const paymentIntent = ref()

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
    failure_code: string,
    failure_message: string,
    process_payment_intent: {
      payment_intent: string
    },
    status: string,
    type: string
  },
  device_sw_version: string,
  device_type: string,
  ip_address: string,
  label: string,
  last_seen_at: number,
  livemode: boolean,
  location: string,
  metadata: {},
  serial_number: string,
  status: string
}

export function getReaders() : Promise<DataListEnvelope<StripeReader>>{
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
    city: string,
    country: string,
    line1: string,
    line2: string,
    postal_code: string,
    state: string
  }
  display_name: string
  livemode: boolean
  metadata: {}
}

export function getLocations(): Promise<DataListEnvelope<StripeLocation>> {
  return api('stripe/locations')
}
