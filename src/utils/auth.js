// Simple client-side auth for admin panel
// Password can be changed by user. Default: desibites123

const AUTH_KEY = 'desibites-admin-auth'
const PASSWORD_KEY = 'desibites-admin-password'

// Default password
const DEFAULT_PASSWORD = 'desibites123'

export function login(password) {
  const correct = getPassword()
  if (password === correct) {
    sessionStorage.setItem(AUTH_KEY, 'true')
    return true
  }
  return false
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY)
}

export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'true'
}

export function getPassword() {
  return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD
}

export function setPassword(newPassword) {
  localStorage.setItem(PASSWORD_KEY, newPassword)
}
