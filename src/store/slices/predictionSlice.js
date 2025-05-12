import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/axios.config";

const predictPlantApiCall = async (imageFile, modelName) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("model_name", modelName);

    const response = await api.post("/predict", formData);
    return {
      predicted_class: response.data?.class_name,
      confidence: response.data?.confidence, // Random confidence between 0.7 and 1.0
      plant_info: response.data?.class_details,
    };
  } catch (error) {
    return error.response.data;
  }
};

// Async thunk for plant identification
export const identifyPlant = createAsyncThunk(
  "prediction/identifyPlant",
  async ({ imageFile, modelName }, { rejectWithValue }) => {
    try {
      const response = await predictPlantApiCall(imageFile, modelName);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to identify plant");
    }
  }
);

const initialState = {
  currentPrediction: null,
  savedPredictions: [],
  loading: false,
  error: null,
};

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    savePrediction: (state, action) => {
      // Check if prediction already exists
      const exists = state.savedPredictions.some(
        (p) => p.predicted_class === action.payload.predicted_class
      );

      if (!exists) {
        state.savedPredictions.push(action.payload);
      }
    },
    clearHistory: (state) => {
      state.savedPredictions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(identifyPlant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(identifyPlant.fulfilled, (state, action) => {
        state.currentPrediction = action.payload;
        state.loading = false;
      })
      .addCase(identifyPlant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { savePrediction, clearHistory } = predictionSlice.actions;

export default predictionSlice.reducer;
