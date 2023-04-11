import data from '../data/users.json'

export interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  password: string
  admin: boolean
}

export function getUsers(): User[] {
  return data.Users
}
