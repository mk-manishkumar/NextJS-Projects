"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface DestinationCardProps {
  readonly name: string;
  readonly image: string;
  readonly price: string;
  readonly index: number;
}

export default function DestinationCard({ name, image, price, index }: DestinationCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -10 }} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
      <div className="relative h-64">
        <Image src={image} alt={name} fill className="object-cover" />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">{price}</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>7 Days Tour</span>
        </div>
      </div>
    </motion.div>
  );
}
