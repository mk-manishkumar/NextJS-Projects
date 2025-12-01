"use client";

import React from "react";
import Link from "next/link";
import { Plane, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Destinations", href: "/destinations" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Safety Information", href: "#" },
      { name: "Cancellation Options", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">Wanderlust</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">Creating unforgettable travel experiences and memories that last a lifetime. Your adventure starts here.</p>
            <div className="space-y-2 pt-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <span className="text-sm">hello@wanderlust.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <span className="text-sm">123 Travel Street, Adventure City, AC 12345</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">© {currentYear} Wanderlust. All rights reserved.</p>
            <p className="text-sm text-gray-400">Made with ❤️ for travelers around the world</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
