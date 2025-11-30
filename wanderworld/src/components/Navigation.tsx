"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.45 }} style={{ height: "var(--nav-height)" }} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Use h-full so inner alignment uses the CSS nav height variable */}
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Wanderlust</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`text-sm font-medium relative transition-colors ${pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>
                {item.name}
                {pathname === item.href && <motion.div layoutId="navbar-indicator" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600" />}
              </Link>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t overflow-hidden" style={{ marginTop: "calc(var(--nav-height) * -1)" }} /* place the dropdown immediately below the nav */>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${pathname === item.href ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"}`}>
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
