"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plane, MapPin, Calendar, Users, Globe, Award, Heart } from "lucide-react";

export default function Homepage() {
  const featuredDestinations = [
    {
      name: "Santorini",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop",
      price: "$1,299",
    },
    {
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop",
      price: "$899",
    },
    {
      name: "Paris",
      country: "France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
      price: "$1,499",
    },
  ];

  const stats = [
    { icon: <Globe className="w-8 h-8" />, value: "150+", label: "Destinations" },
    { icon: <Users className="w-8 h-8" />, value: "50K+", label: "Happy Travelers" },
    { icon: <Award className="w-8 h-8" />, value: "25+", label: "Awards Won" },
    { icon: <Heart className="w-8 h-8" />, value: "98%", label: "Satisfaction" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-4rem)] flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <motion.h1 className="text-5xl md:text-7xl font-bold leading-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
                Explore the <span className="bg-linear-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">World</span>
                <br />
                Your Way
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-xl text-gray-600 leading-relaxed">
                Discover breathtaking destinations, create unforgettable memories, and embark on the adventure of a lifetime with our expertly curated travel experiences.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-wrap gap-4">
                <Link href="/destinations">
                  <button className="px-8 py-4 bg-linear-to-br from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">Start Exploring</button>
                </Link>
                <Link href="/about">
                  <button className="px-8 py-4 border-2 border-gray-300 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">Learn More</button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-30"></div>
              <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop" alt="Travel Adventure" width={800} height={600} className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover" priority />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-500 text-white rounded-2xl mb-4">{stat.icon}</div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-xl text-gray-600">Handpicked paradises waiting for you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredDestinations.map((dest, index) => (
              <motion.div key={dest.name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.5 }} whileHover={{ y: -10 }} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <div className="relative h-64">
                  <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">{dest.price}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{dest.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{dest.country}</span>
                  </div>
                  <button className="w-full py-3 bg-linear-to-br from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">View Details</button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <Link href="/destinations">
              <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105">View All Destinations</button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Wanderlust?</h2>
            <p className="text-xl text-gray-600">Your journey matters to us</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Expert Local Guides",
                description: "Our professional guides bring destinations to life with their deep local knowledge and passion for travel.",
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Flexible Booking",
                description: "Easy booking process with flexible cancellation policies. Change your plans without worry.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Personalized Experience",
                description: "Whether group tours or private adventures, we customize every trip to match your preferences.",
              },
            ].map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.5 }} className="bg-linear-to-br from-blue-50 to-purple-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Plane className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready for Your Next Adventure?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Start planning your dream vacation today. Our travel experts are ready to help you create unforgettable memories.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/destinations">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">Browse Destinations</button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">Contact Us</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
