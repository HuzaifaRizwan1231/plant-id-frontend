import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Mock API calls
const mockLoginApi = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate validation
      if (!credentials.email || !credentials.password) {
        reject(new Error("Email and password are required"))
        return
      }

      if (credentials.email === "error@example.com") {
        reject(new Error("Invalid credentials"))
        return
      }

      resolve({
        token: "mock-jwt-token",
        user: {
          id: "123",
          email: credentials.email,
          name: credentials.email.split("@")[0],
        },
      })
    }, 800)
  })
}

const mockSignupApi = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate validation
      if (!credentials.email || !credentials.password) {
        reject(new Error("Email and password are required"))
        return
      }

      if (credentials.email === "taken@example.com") {
        reject(new Error("Email already in use"))
        return
      }

      resolve({
        token: "mock-jwt-token",
        user: {
          id: "123",
          email: credentials.email,
          name: credentials.email.split("@")[0],
        },
      })
    }, 800)
  })
}

// Async thunks
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await mockLoginApi(credentials)

    // Store in localStorage for persistence
    localStorage.setItem("token", response.token)
    localStorage.setItem("user", JSON.stringify(response.user))

    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const signup = createAsyncThunk("auth/signup", async (credentials, { rejectWithValue }) => {
  try {
    const response = await mockSignupApi(credentials)

    // Store in localStorage for persistence
    localStorage.setItem("token", response.token)
    localStorage.setItem("user", JSON.stringify(response.user))

    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.loading = false
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.loading = false
        state.error = null
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { loginSuccess, logoutSuccess } = authSlice.actions

export const logout = () => (dispatch) => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  dispatch(logoutSuccess())
}

export default authSlice.reducer
