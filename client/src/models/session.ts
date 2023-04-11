import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import * as cFetch from './fetch'

const session = reactive({
  user: null as User | null,
  isLoading: false as boolean,
  messages: [] as {
    msg: string
    type: 'success' | 'danger' | 'warning' | 'info'
  }[]
})

interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  password: string
  admin: boolean
}

export function useSession() {
  return session
}

export function useLogout() {
  const router = useRouter()
  return function logout() {
    session.user = null
    router.push('/login')
  }
}

export function login(users: User) {
  session.user = {
    id: users.id,
    firstName: users.firstName,
    lastName: users.lastName,
    username: users.username,
    password: users.password,
    admin: users.admin
  }
}

export function api(url: string, data?: any, method?: string, headers?: any) {
  session.isLoading = true
  return cFetch
    .api(url)
    .catch((err) => {
      console.error(err)
      session.messages.push({
        msg: err.message ?? JSON.stringify(err),
        type: 'danger'
      })
    })
    .finally(() => {
      session.isLoading = false
    })
}
