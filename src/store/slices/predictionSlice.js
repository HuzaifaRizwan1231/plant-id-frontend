import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Mock API call for plant identification
const mockIdentifyApi = async (imageFile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock response with plant data
      resolve({
        predicted_class: getRandomPlant(),
        confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7 and 1.0
        plant_info: getPlantInfo(),
      })
    }, 1500)
  })
}

// Helper function to get a random plant name
const getRandomPlant = () => {
  const plants = [
    "monstera",
    "fiddle leaf fig",
    "snake plant",
    "pothos",
    "peace lily",
    "aloe vera",
    "spider plant",
    "rubber plant",
    "zz plant",
    "philodendron",
  ]
  return plants[Math.floor(Math.random() * plants.length)]
}

// Helper function to generate mock plant info
const getPlantInfo = () => {
  return {
    scientific_name: "Plantus exampleus",
    common_names: ["Example Plant", "Mock Flora", "Test Greenery"],
    origin: "Native to tropical regions of South America, this plant has adapted to various climates around the world.",
    growing_conditions: {
      climate: "Tropical to subtropical, can adapt to indoor environments.",
      light: "Bright, indirect light. Can tolerate some shade but may affect growth.",
      soil: "Well-draining, rich in organic matter with a pH of 6.0-7.0.",
      water: "Keep soil consistently moist but not soggy. Allow top inch to dry between waterings.",
      humidity: "Prefers high humidity (50-60%). Mist regularly in dry environments.",
    },
    care_tips: {
      planting: "Plant in a pot with drainage holes using well-draining soil mix.",
      fertilization: "Feed monthly during growing season with balanced liquid fertilizer.",
      pruning: "Remove dead or yellowing leaves to encourage new growth.",
      pests: "Watch for spider mites and mealybugs. Treat with neem oil or insecticidal soap.",
      propagation: "Easily propagated through stem cuttings in water or soil.",
      indoor: "Makes an excellent houseplant. Rotate occasionally for even growth.",
    },
    interesting_facts: [
      "This plant is known for its air-purifying qualities.",
      "In its native habitat, it can grow up to three times the size of indoor specimens.",
      "Some cultures believe this plant brings good luck and prosperity.",
      "The leaves change shape as the plant matures.",
    ],
    warnings:
      "May be mildly toxic if ingested. Keep away from pets and children. Sap may cause skin irritation in sensitive individuals.",
  }
}

// Async thunk for plant identification
export const identifyPlant = createAsyncThunk("prediction/identifyPlant", async (imageFile, { rejectWithValue }) => {
  try {
    const response = await mockIdentifyApi(imageFile)
    return response
  } catch (error) {
    return rejectWithValue(error.message || "Failed to identify plant")
  }
})

const initialState = {
  currentPrediction: null,
  savedPredictions: [],
  loading: false,
  error: null,
}

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    savePrediction: (state, action) => {
      // Check if prediction already exists
      const exists = state.savedPredictions.some((p) => p.predicted_class === action.payload.predicted_class)

      if (!exists) {
        state.savedPredictions.push(action.payload)
      }
    },
    clearHistory: (state) => {
      state.savedPredictions = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(identifyPlant.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(identifyPlant.fulfilled, (state, action) => {
        state.currentPrediction = action.payload
        state.loading = false
      })
      .addCase(identifyPlant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { savePrediction, clearHistory } = predictionSlice.actions

export default predictionSlice.reducer
