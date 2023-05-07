import { api } from './session'
import type { DataEnvelope, DataListEnvelope } from './fetch'

export interface Users {
  _id: string
  id?: number
  firstName: string
  lastName: string
  username: string
  password: string
  isAdmin: boolean
  stripe_data: {
    stripe_location_id: string | 'none'
    stripe_reader_id: string | 'none'
  }
}

export function getUsers(): Promise<DataListEnvelope<Users>> {
  return api('users')
}

export function getUser(id: string): Promise<DataEnvelope<Users>> {
  return api('users/' + id)
}

export function deleteUser(id: string) {
  return api('users/delete/' + id, null, 'DELETE')
}

export function createUser(user: Users): Promise<DataEnvelope<Users>> {
  return api('users/create', user, 'POST')
}

export function getUsersLength(): Promise<Number> {
  return api('users').then((res) => {
    return res.data.length
  })
}

export function editUser(user: Users) {
  return api('users/update/' + user._id, user, 'PATCH')
}
