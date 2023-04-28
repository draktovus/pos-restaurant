import { api } from './session'
import type { DataEnvelope, DataListEnvelope } from './fetch'

export interface Users {
  _id?: string
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

export function getUsers(): Promise<DataListEnvelope<Users>> {
  return api('users')
}

export function deleteUser(id: number) {
  api('users/delete/' + id, null, 'DELETE')
}

export async function createUser(
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  isAdmin: boolean
) {
  api(
    'users/create',
    {
      id: id,
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      isAdmin: isAdmin,
      stripe_data: {
        stripe_location_id: 'string',
        stripe_reader_id: 'string'
      }
    },
    'POST'
  )
}

export function getUsersLength(): Promise<Number> {
  return api('users').then((res) => {
    return res.data.length
  })
}
