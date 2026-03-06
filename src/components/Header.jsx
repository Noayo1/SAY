"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config";

export default function Header() {
  const pathname = usePathname();
  const isDark = pathname === "/studio";
  const isProjectPage = pathname.startsWith("/projects/") && pathname !== "/projects";
  const isProjectsSection = pathname.startsWith("/projects");
  const isStudioSection = pathname === "/studio";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isDark ? "text-white" : "text-black";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isStudioSection ? "bg-[#0c0c0c]" : scrolled || isProjectsSection ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-14 lg:h-20">
          <Link
            href="/projects"
            className={`text-xs lg:text-sm font-medium tracking-widest uppercase ${textColor} hover:opacity-60 transition ${isProjectsSection ? "underline underline-offset-4" : ""}`}
          >
            Projects
          </Link>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.companyName}
              width={140}
              height={56}
              style={{ height: "auto", maxHeight: "3.5rem", width: "auto" }}
              className={`lg:!max-h-20 ${isDark ? "invert" : ""}`}
              priority
            />
          </Link>

          <Link
            href="/studio"
            className={`text-xs lg:text-sm font-medium tracking-widest uppercase ${textColor} hover:opacity-60 transition ${isStudioSection ? "underline underline-offset-4" : ""}`}
          >
            Studio
          </Link>
        </div>
      </div>
    </header>
  );
}
