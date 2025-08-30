"use client"

import { useState } from "react"

export default function WarrantyRegistration() {
  const [formData, setFormData] = useState({
    serialNumbers: "",
    fullName: "",
    phone: "",
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted Data:", formData)
    alert("Warranty Registered Successfully ✅")
    setFormData({ serialNumbers: "", fullName: "", phone: "", email: "" })
  }

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header */}
      
      <div className="bg-gray-800 py-12 px-6 flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold">Warranty Registration</h1>
        <p className="text-white/80 mt-2 text-sm">Home / Warranty Registration</p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 space-y-6"
        >
          {/* Serial Numbers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serial Numbers *
            </label>
            <textarea
              name="serialNumbers"
              value={formData.serialNumbers}
              onChange={handleChange}
              required
              placeholder="e.g 3DWRT66GE, 6HJY8PL90"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use commas to separate multiple serial numbers
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="e.g Nelson Mandela"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="e.g 0721 959 595"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g nelsonmandela@gmail.com"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  )
}
