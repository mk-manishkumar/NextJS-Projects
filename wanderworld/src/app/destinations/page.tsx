"use client";

import React from "react";
import { motion } from "framer-motion";
import DestinationCard from "@/components/DestinationCard";

export default function DestinationsPage() {
  const destinations = [
    {
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop",
      price: "$1,299",
    },
    {
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop",
      price: "$899",
    },
    {
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
      price: "$1,499",
    },
    {
      name: "Maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop",
      price: "$2,199",
    },
    {
      name: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
      price: "$1,599",
    },
    {
      name: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
      price: "$1,799",
    },
    {
      name: "New York, USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
      price: "$1,399",
    },
    {
      name: "Iceland",
      image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&h=400&fit=crop",
      price: "$1,899",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-xl text-gray-600">Handpicked places for your next adventure</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest, index) => (
            <DestinationCard key={dest.name} name={dest.name} image={dest.image} price={dest.price} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
