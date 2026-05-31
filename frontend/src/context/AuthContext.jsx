import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setAuthChecked(true)
      return
    }
    authService.getMe()
      .then(res => setAdmin(res.data.data))
      .catch(() => localStorage.removeItem('admin_token'))
      .finally(() => setAuthChecked(true))
  }, [])

  const login = (token, adminData) => {
    localStorage.setItem('admin_token', token)
    setAdmin(adminData)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, authChecked, login, logout, isLoggedIn: !!admin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
