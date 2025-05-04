"use client";

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { savePrediction } from "../store/slices/predictionSlice";
import PlantInfoCard from "./PlantInfoCard";

const PredictionResult = ({ prediction, image }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { savedPredictions } = useSelector((state) => state.prediction);

  const isSaved = savedPredictions.some(
    (p) => p.predicted_class === prediction.predicted_class
  );

  const handleSave = () => {
    dispatch(
      savePrediction({
        ...prediction,
        image,
        timestamp: new Date().toISOString(),
      })
    );
  };

  if (!prediction) return null;

  const { predicted_class, confidence, plant_info } = prediction;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 relative"
      >
        {/* Decorative plant elements */}
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
          <svg
            className="w-40 h-40 text-green-800"
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

        <div className="md:flex">
          <div className="md:w-1/3 relative">
            {image && (
              <>
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt={predicted_class}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900 to-transparent opacity-70 h-16"></div>
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium px-2 py-1 bg-green-800 bg-opacity-70 rounded-md">
                  Identified Plant
                </div>
              </>
            )}
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-2">
                  <svg
                    className="w-6 h-6 text-green-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <h2 className="text-3xl font-bold text-green-800 capitalize">
                    {predicted_class}
                  </h2>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {Math.round(confidence * 100)}% confidence
                  </span>
                </div>
              </div>

              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={isSaved}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    isSaved
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill={isSaved ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                  {isSaved ? "Saved" : "Save to History"}
                </motion.button>
              )}
            </div>

            <p className="text-gray-600 mb-4 flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>
                We've identified this plant as{" "}
                <span className="font-semibold">{predicted_class}</span>. Scroll
                down to learn more about this plant, including care tips and
                interesting facts.
              </span>
            </p>

            {!isAuthenticated && (
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm flex items-start">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
                <p>
                  <span className="font-medium">Pro tip:</span> Sign up or log
                  in to save this identification to your history!
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <PlantInfoCard plantInfo={plant_info} />
    </div>
  );
};

export default PredictionResult;
