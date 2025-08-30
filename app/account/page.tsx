"use client"
import { useState } from "react"
import React from "react"

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Red header */}
      <div className="bg-gray-800 py-12 px-6 flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold">My account</h1>
        <p className="text-white/80 mt-2 text-sm">Home / My account</p>
      </div>

      {/* Card container */}
      <div className="max-w-5xl mx-auto mt-10 bg-white shadow rounded-lg grid md:grid-cols-2 border">
        {/* Left side */}
        <div className="p-8 border-r">
          {isLogin ? (
            <>
              <h2 className="text-lg font-semibold mb-6">LOGIN</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Username or email address *
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Password *</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-2 rounded hover:bg-red-700"
                >
                  Log in
                </button>

                <div className="flex items-center justify-between text-sm mt-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" /> Remember me
                  </label>
                  <a href="#" className="text-red-600 hover:underline">
                    Lost your password?
                  </a>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-6">REGISTER</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Email address *
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <p className="text-xs text-gray-600">
                  A link to set a new password will be sent to your email address.
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account,
                  and for other purposes described in our privacy policy.
                </p>
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-2 rounded hover:bg-red-700"
                >
                  Register
                </button>
              </form>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="p-8">
          <h2 className="text-lg font-semibold mb-4">
            {isLogin ? "LOGIN" : "REGISTER"}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Registering for this site allows you to access your order status and
            history. Just fill in the fields below, and we&apos;ll get a new account
            set up for you in no time. We will only ask you for information
            necessary to make the purchase process faster and easier.
          </p>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-600 font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </section>
  )
}
