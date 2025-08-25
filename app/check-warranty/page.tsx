"use client"

import { useState } from "react"

export default function CheckWarranty() {
  const [serialNumber, setSerialNumber] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Mock check - replace this with API call
    if (serialNumber.trim().toUpperCase() === "3DWRT66GE") {
      setResult("✅ Warranty found: Registered to Nelson Mandela, valid until 2026.")
    } else {
      setResult("❌ No warranty found for this serial number.")
    }
  }

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 py-12 px-6 flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold">Check Warranty Registration</h1>
        <p className="text-white/80 mt-2 text-sm">Home / Check Warranty</p>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 space-y-6"
        >
          {/* Serial Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serial Number
            </label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
              placeholder="e.g 3DWRT66GE"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition"
          >
            Check
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-6 text-center p-4 bg-gray-100 rounded-lg text-gray-700">
            {result}
          </div>
        )}
      </div>
    </section>
  )
}
