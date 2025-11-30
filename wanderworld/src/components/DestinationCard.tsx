"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface DestinationCardProps {
  readonly name: string;
  readonly image: string;
  readonly price: string;
  readonly index?: number;
}

export default function DestinationCard({ name, image, price, index = 0 }: DestinationCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -8 }} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
      {/* Stable aspect ratio helps consistent card height */}
      <div className="relative aspect-4/3 md:aspect-video">
        <Image src={image} alt={name} fill className="object-cover" />
        <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">{price}</div>
      </div>
      <div className="p-5">
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">{name}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
          <span>7 Days Tour</span>
        </div>
        <button className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 shadow-md">View Details</button>
      </div>
    </motion.div>
  );
}
