"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { identifyPlant } from "../store/slices/predictionSlice";
import ImageUpload from "../components/ImageUpload";
import PredictionResult from "../components/PredictionResult";
import LoadingSpinner from "../components/LoadingSpinner";

const PlantID = () => {
  const models = [
    { value: "resnet", name: "Res Net 50" },
    { value: "efficientnet", name: "Efficient Net B0" },
    { value: "mobilenet", name: "Mobile Net" },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0].value);

  const location = useLocation();
  const dispatch = useDispatch();

  // Check if we have a prediction from history
  useEffect(() => {
    if (location.state?.prediction) {
      setPrediction(location.state.prediction);
      if (location.state.prediction.image) {
        setSelectedImage(location.state.prediction.image);
      }
    }
  }, [location.state]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setPrediction(null);
    setError("");
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Dispatch the action to identify the plant
      const result = await dispatch(
        identifyPlant({ imageFile: selectedImage, modelName: selectedModel })
      ).unwrap();
      setPrediction(result);
    } catch (err) {
      setError(err.message || "Failed to identify plant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative plant elements */}
        <div className="absolute top-0 right-0 -mt-10 opacity-10 hidden md:block">
          <svg
            className="w-64 h-64 text-green-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 -mb-20 opacity-5 hidden md:block">
          <svg
            className="w-80 h-80 text-green-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 relative z-10"
        >
          <div className="inline-block mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Identify Your Plant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload or take a photo of a plant and our AI will identify it for
            you, providing detailed information and care instructions.
          </p>
        </motion.div>

        <div className="flex mb-8">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-52 mx-auto p-3 text-base border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {models.map((model, index) => (
              <option key={index} value={model.value} className="text-center">
                {model.name}
              </option>
            ))}
          </select>
        </div>

        {!prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <ImageUpload onImageSelect={handleImageSelect} />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-md bg-red-50 text-red-500 text-sm max-w-xl mx-auto"
              >
                {error}
              </motion.div>
            )}

            <div className="mt-6 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={!selectedImage || loading}
                className={`px-6 py-3 rounded-md text-white font-medium flex items-center justify-center mx-auto ${
                  !selectedImage || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Identify Plant
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {loading && <LoadingSpinner />}

        {prediction && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PredictionResult prediction={prediction} image={selectedImage} />

            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedImage(null);
                  setPrediction(null);
                }}
                className="px-6 py-3 rounded-md text-green-600 border border-green-600 font-medium hover:bg-green-50 transition-colors flex items-center justify-center mx-auto"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Identify Another Plant
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PlantID;
