"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HistoryCard = ({ prediction, index }) => {
  const { predicted_class, confidence, image, timestamp } = prediction;

  const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
    >
      <div className="absolute top-0 right-0 w-12 h-12 bg-green-50 rounded-bl-full z-0"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-50 rounded-tr-full z-0"></div>

      <div className="relative h-48">
        <img
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt={predicted_class}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <svg
            className="w-3 h-3 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          {Math.round(confidence * 100)}%
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16 opacity-60"></div>
        <div className="absolute bottom-2 left-2 text-white font-medium capitalize">
          {predicted_class}
        </div>
      </div>

      <div className="p-4 relative z-10">
        <div className="flex items-center mb-1">
          <svg
            className="w-4 h-4 text-green-600 mr-1"
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
          <h3 className="text-lg font-semibold text-green-800 capitalize">
            {predicted_class}
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-3 flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            ></path>
          </svg>
          {formattedDate} at {formattedTime}
        </p>

        <Link
          to="/identify"
          state={{ prediction }}
          className="text-green-600 text-sm font-medium hover:text-green-800 flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default HistoryCard;
