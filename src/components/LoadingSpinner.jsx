"use client"

import { motion } from "framer-motion"

const LoadingSpinner = ({ message = "Processing your image..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full mb-4"
      />
      <p className="text-gray-600 text-center">{message}</p>
    </div>
  )
}

export default LoadingSpinner
