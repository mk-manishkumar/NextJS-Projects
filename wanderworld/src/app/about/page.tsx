"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, Users } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Expert Guides",
      description: "Professional local guides with deep knowledge",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Flexible Booking",
      description: "Easy booking with flexible cancellation policies",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Tours",
      description: "Join groups or customize private experiences",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Journey,
              <br />
              Our Passion
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">For over a decade, we haveve been crafting unforgettable travel experiences that connect people with cultures, nature, and adventure around the globe.</p>
            <p className="text-lg text-gray-600 leading-relaxed">Our team of travel experts curates each destination with care, ensuring you get authentic experiences and memories that last a lifetime.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative">
            <Image src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop" alt="About" width={800} height={600} className="rounded-3xl shadow-2xl w-full h-[400px] object-cover" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.5 }} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
