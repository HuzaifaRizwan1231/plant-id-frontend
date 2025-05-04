"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { loginSuccess, logoutSuccess } from "../store/slices/authSlice"

const useAuth = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if user is already logged in (token in localStorage)
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token && user) {
      try {
        dispatch(
          loginSuccess({
            token,
            user: JSON.parse(user),
          }),
        )
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }

    setLoading(false)
  }, [dispatch])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch(logoutSuccess())
  }

  return { loading, handleLogout }
}

export default useAuth
