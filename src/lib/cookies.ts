type SameSite = 'Lax' | 'Strict' | 'None'

type SetCookieOptions = {
  maxAgeSeconds?: number
  path?: string
  sameSite?: SameSite
  secure?: boolean
}

export const getCookie = (name: string) => {
  if (typeof document === 'undefined') return undefined

  const parts = document.cookie.split('; ')
  for (const part of parts) {
    const eqIndex = part.indexOf('=')
    if (eqIndex === -1) continue

    const key = decodeURIComponent(part.slice(0, eqIndex))
    if (key !== name) continue

    return decodeURIComponent(part.slice(eqIndex + 1))
  }

  return undefined
}

export const setCookie = (name: string, value: string, options: SetCookieOptions = {}) => {
  if (typeof document === 'undefined') return

  const {
    maxAgeSeconds = 60 * 60 * 24 * 365,
    path = '/',
    sameSite = 'Lax',
    secure,
  } = options

  const encodedName = encodeURIComponent(name)
  const encodedValue = encodeURIComponent(value)
  let cookie = `${encodedName}=${encodedValue}; path=${path}; max-age=${maxAgeSeconds}; samesite=${sameSite}`

  if (secure ?? sameSite === 'None') {
    cookie += '; secure'
  }

  document.cookie = cookie
}

