"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Trigger click to open the accordion
      const button = element.querySelector("button");
      if (button) {
        button.click();
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.companyName}
              width={250}
              height={100}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("work")}
              className="text-gray-700 hover:text-black transition font-medium"
            >
              WORK
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-black transition font-medium"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-black transition font-medium"
            >
              CONTACT
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <button
              onClick={() => scrollToSection("work")}
              className="block w-full text-left py-2 text-gray-700 hover:text-black font-medium"
            >
              WORK
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-gray-700 hover:text-black font-medium"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-gray-700 hover:text-black font-medium"
            >
              CONTACT
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
