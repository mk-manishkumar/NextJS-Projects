"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with real submit logic later
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Get In Touch</h2>
          <p className="text-lg text-gray-600">We would love to hear from you</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input id="name" name="name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="John Doe" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input id="email" name="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="john@example.com" required />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea id="message" name="message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none" placeholder="Tell us about your dream destination..." required />
              </div>

              <button type="submit" className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Send Message
              </button>
            </div>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-5">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">123 Travel Street, Adventure City, AC 12345</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">hello@wanderlust.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl shadow-xl p-6 md:p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Ready to Adventure?</h3>
              <p className="mb-5">Subscribe to our newsletter for exclusive travel deals and inspiration.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Subscribed! 🎉");
                }}
                className="flex"
              >
                <input type="email" required className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 outline-none" placeholder="Your email" />
                <button className="px-5 bg-white text-blue-600 font-semibold rounded-r-lg hover:bg-gray-100 transition">Subscribe</button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
