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
}

export function getUsers(): Promise<DataListEnvelope<User>> {
  return api('users')
}
