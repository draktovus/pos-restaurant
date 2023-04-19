import { api } from './session'
import type { DataEnvelope, DataListEnvelope } from './fetch'

export interface User {
  _id: string
  id: number
  firstName: string
  lastName: string
  username: string
  password: string
  isAdmin: boolean
  stripe_data: {
    stripe_location_id: string
    stripe_reader_id: string
  }
}

export function getUsers(): Promise<DataListEnvelope<User>> {
  return api('users')
}
