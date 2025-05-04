import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import predictionReducer from "./slices/predictionSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    prediction: predictionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["prediction/identifyPlant/fulfilled"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.image"],
        // Ignore these paths in the state
        ignoredPaths: ["prediction.savedPredictions"],
      },
    }),
})
