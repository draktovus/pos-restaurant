import { api } from './session'
import type { DataEnvelope, DataListEnvelope } from './fetch'

export interface Users {
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

export function getUsers(): Promise<DataListEnvelope<Users>> {
  return api('users')
}

export function getUser(id: string): Promise<DataEnvelope<Users>> {
  return api('users/' + id)
}

export function deleteUser(id: string) {
  return api('users/delete/' + id, null, 'DELETE')
}

export function createUser(
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  isAdmin: boolean
) {
  return api('users/create',
    {
      id: id,
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      isAdmin: isAdmin,
      stripe_data: {
        stripe_location_id: 'none',
        stripe_reader_id: 'none'
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

export function editUser(id: number, firstName: string, lastName: string, password: string, isAdmin: boolean, _id: string) {
  return api('users/update/' + _id,
  {
    "id": id,
    "firstName": firstName,
    "lastName": lastName,
    "password": password,
    "isAdmin": isAdmin
  },
  'PATCH')
}



