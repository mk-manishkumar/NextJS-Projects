"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-4rem)] flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Explore the <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">World</span>
              <br />
              Your Way
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-xl text-gray-600 leading-relaxed">
              Discover breathtaking destinations, create unforgettable memories, and embark on the adventure of a lifetime.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">Start Exploring</button>
              <button className="px-8 py-4 border-2 border-gray-300 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">Watch Video</button>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-30"></div>
            <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop" alt="Travel" width={800} height={600} className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover" priority />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
