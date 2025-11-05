"use client";
import { useState } from 'react';

export default function AccordionSection({ title, children, defaultOpen = false, id }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div id={id} className="border-t border-gray-300 scroll-mt-24">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 md:py-12 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-left">
          {title}
        </h2>
        <div className="flex-shrink-0 ml-4">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-black flex items-center justify-center transition-transform">
            {isOpen ? (
              <span className="text-3xl md:text-4xl font-light">−</span>
            ) : (
              <span className="text-3xl md:text-4xl font-light">+</span>
            )}
          </div>
        </div>
      </button>
      
      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-12 md:pb-16">
          {children}
        </div>
      </div>
    </div>
  );
}
