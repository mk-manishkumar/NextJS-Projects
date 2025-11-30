"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plane, MapPin, Calendar, Users, Globe, Award, Heart } from "lucide-react";
import DestinationCard from "@/components/DestinationCard";

export default function HomePage() {
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
      <section className="relative bg-linear-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh - var(--nav-height))] flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6 md:space-y-8 text-center lg:text-left max-w-xl">
              <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
                Explore the <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">World</span>
                <br />
                Your Way
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Discover breathtaking destinations, create unforgettable memories, and embark on the adventure of a lifetime with our expertly curated travel experiences.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center sm:items-start">
                <Link href="/destinations" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-lg">Start Exploring</button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 bg-white rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:shadow-lg">Learn More</button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative w-full h-[420px] sm:h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop" alt="Travel Adventure" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-blue-500 to-purple-500 text-white rounded-2xl mb-4 shadow-lg">{stat.icon}</div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-12 md:py-20 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-gray-900">Featured Destinations</h2>
            <p className="text-lg sm:text-xl text-gray-600">Handpicked paradises waiting for you</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {featuredDestinations.map((dest, index) => (
              <DestinationCard key={dest.name} name={dest.name} image={dest.image} price={dest.price} index={index} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <Link href="/destinations">
              <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg">View All Destinations</button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-gray-900">Why Choose Wanderlust?</h2>
            <p className="text-lg sm:text-xl text-gray-600">Your journey matters to us</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
              <motion.div key={feature.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.5 }} className="bg-linear-to-br from-blue-50 to-purple-50 p-6 md:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-blue-100">
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">{feature.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6 md:space-y-8">
            <Plane className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white px-4">Ready for Your Next Adventure?</h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4">Start planning your dream vacation today. Our travel experts are ready to help you create unforgettable memories.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link href="/destinations" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-xl">Browse Destinations</button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg">Contact Us</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
