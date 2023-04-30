/*  B"H
 */
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as myFetch from './fetch'
import type { Users } from './users'

const session = reactive({
  user: null as Users | null,
  isLoading: false,
  messages: [] as {
    msg: string
    type: 'success' | 'danger' | 'warning' | 'info'
    state: string
  }[],
  redirectUrl: null as string | null
})

export function useSession() {
  return session
}

export function api(url: string, data?: any, method?: string, headers?: any) {
  session.isLoading = true
  return myFetch
    .api(url, data, method, headers)
    .catch((err) => {
      console.error({ err })
      session.messages.push({
        msg: err.message ?? JSON.stringify(err),
        type: 'danger',
        state: 'none'
      })
    })
    .finally(() => {
      session.isLoading = false
    })
}

export function useLogin() {
  const router = useRouter()

  return function (user: Users) {
    session.user = {
      ...user
    }
    router.push(session.redirectUrl ?? '/')
    session.redirectUrl = null
  }
}

export function useLogout() {
  const router = useRouter()

  return function () {
    console.log({ router })
    session.user = null

    router.push('/login')
  }
}

export function addMessage(
  msg: string,
  type: 'success' | 'danger' | 'warning' | 'info',
  state: string = 'none'
) {
  console.log({ msg, type, state })
  session.messages.push({
    msg,
    type,
    state
  })
}

export function deleteMessage(index: number) {
  console.log("deleted message at index:", index)
  session.messages.splice(index, 1)
}
