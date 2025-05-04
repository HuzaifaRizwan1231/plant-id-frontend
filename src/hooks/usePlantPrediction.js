"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { identifyPlant } from "../store/slices/predictionSlice"

const usePlantPrediction = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [prediction, setPrediction] = useState(null)

  const dispatch = useDispatch()

  const identifyPlantImage = async (image) => {
    if (!image) {
      setError("Please select an image first")
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const result = await dispatch(identifyPlant(image)).unwrap()
      setPrediction(result)
      return result
    } catch (err) {
      setError(err.message || "Failed to identify plant. Please try again.")
      return null
    } finally {
      setLoading(false)
    }
  }

  const resetPrediction = () => {
    setPrediction(null)
    setError(null)
  }

  return {
    loading,
    error,
    prediction,
    identifyPlantImage,
    resetPrediction,
  }
}

export default usePlantPrediction
