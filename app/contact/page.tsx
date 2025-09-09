"use client";

import Image from "next/image";

export default function ContactUsPage() {
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gray-800 py-10 px-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
          Contact
        </h1>
        <p className="text-white/70 text-sm md:text-base">Home / Contact</p>
      </div>

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full bg-white shadow-xl rounded-2xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Contact Details */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed">
              Feel free to reach out to us via phone or make a payment using our
              official M-PESA Paybill details below.
            </p>

            {/* Contact Number */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800">Phone Number</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600 mt-2">
                0723 809 057
              </p>
            </div>

            {/* Payment Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Payment Instructions
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  Paybill: <span className="font-bold">880100</span>
                </li>
                <li>
                  Account: <span className="font-bold">238090</span>
                </li>
                <li>
                  Name: <span className="font-bold">Gericom Network</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Mpesa Image */}
          <div className="flex justify-center">
            <Image
              src="/pay.jpg"
              alt="Lipa Na Mpesa Paybill"
              width={500}
              height={350}
              className="rounded-xl shadow-lg object-contain"
            />
          </div>
        </div>
      </main>
    </section>
  );
}
