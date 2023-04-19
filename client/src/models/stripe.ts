import { computed, ref } from 'vue'
import { api } from './session'

export const readersList = ref()

export const locationsList = ref()

export const reader = ref()

// Amount should be computed from cart total.
export const amount = ref()

export const paymentIntent = ref()

export async function getReaders() {
  const response = await api('stripe/readers')
  console.log({ response })
  readersList.value = response.data
  return response.data
}

export async function getLocations() {
  const response = await api('stripe/locations')
  console.log({ response })
  locationsList.value = response.data
  return response.data
}
