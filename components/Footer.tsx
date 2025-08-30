"use client"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 relative">
      {/* Location Section */}
      <section className="text-center py-12 bg-[url('/footer-bg.jpg')] bg-cover bg-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          We are located
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 px-6">
          {/* Nextgen Mall */}
          <div>
            <p className="mb-4 text-lg text-gray-200">
              Nextgen Mall, along Mombasa Road<br />
              Mezzanine floor, shop number 14
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7892245241073!2d36.834174!3d-1.326132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13c1d9e16a01%3A0xd3b1d3ef3f2f31d1!2sNextgen%20Mall!5e0!3m2!1sen!2ske!4v1700000000000"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Gallant Mall */}
          <div>
            <p className="mb-4 text-lg text-gray-200">
              Gallant Mall, Parklands road, Westlands<br />
              Shop number 2, next to Art Caffe
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8300413099873!2d36.817563!3d-1.264574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17c5f8a3a6ff%3A0xf4e68d81a1d1a4a6!2sGallant%20Mall!5e0!3m2!1sen!2ske!4v1700000000001"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-6 text-center text-sm">
        <p>Copyright © {new Date().getFullYear()} Imax Camera Ltd. All rights reserved.</p>
        <p>
          Crafted by{" "}
          <Link href="https://digitaltailor.agency" className="text-red-500 hover:underline">
            Digital Tailor Agency
          </Link>
        </p>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/254723809057" 
        target="_blank"
        className="fixed bottom-6 left-6 bg-green-500 text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-lg hover:bg-green-600 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M20.52 3.48A11.87 11.87 0 0012 0C5.37 0 0 5.37 0 12c0 2.1.55 4.16 1.59 5.97L0 24l6.25-1.63A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.2-3.48-8.52zM12 21.5c-1.82 0-3.59-.48-5.15-1.39l-.37-.21-3.72.97.99-3.62-.24-.38A9.49 9.49 0 012.5 12C2.5 6.76 6.76 2.5 12 2.5c2.53 0 4.9.99 6.68 2.77A9.42 9.42 0 0121.5 12c0 5.24-4.26 9.5-9.5 9.5zm4.61-7.33c-.25-.13-1.48-.73-1.71-.82-.23-.09-.4-.13-.57.13s-.66.82-.81.99c-.15.17-.3.19-.55.06-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.39.11-.52.11-.11.25-.3.37-.45.12-.15.15-.26.23-.43.08-.17.04-.32-.02-.45-.06-.13-.57-1.38-.78-1.9-.2-.48-.41-.42-.57-.43h-.49c-.17 0-.45.06-.68.32s-.89.86-.89 2.1c0 1.24.91 2.44 1.03 2.6.13.17 1.79 2.73 4.34 3.83.61.26 1.09.41 1.46.52.61.19 1.17.16 1.61.1.49-.07 1.48-.61 1.69-1.19.21-.57.21-1.06.15-1.19-.06-.13-.23-.19-.49-.32z"/>
        </svg>
        Enquire/Buy via Whatsapp
      </a>
    </footer>
  )
}