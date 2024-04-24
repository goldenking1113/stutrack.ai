import React from 'react'

export default function Loading() {
  return (
    <div className="animate-pulse">
    <div className="w-2/3 h-4 bg-gray-300 rounded mb-2" />
    <div className="w-full h-8 bg-gray-300 rounded mb-2" />
    <div className="w-full h-8 bg-gray-300 rounded mb-2" />
    <div className="w-1/2 h-8 bg-gray-300 rounded" />
  </div>
  )
}
