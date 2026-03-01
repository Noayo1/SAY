"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config";

export default function Header() {
  const pathname = usePathname();
  const isDark = pathname === "/studio";
  const textColor = isDark ? "text-white" : "text-black";

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-20">
          <Link
            href="/projects"
            className={`text-sm font-medium tracking-widest uppercase ${textColor} hover:opacity-60 transition`}
          >
            Projects
          </Link>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.companyName}
              width={280}
              height={100}
              className={`h-20 w-auto ${isDark ? "invert" : ""}`}
              priority
            />
          </Link>

          <Link
            href="/studio"
            className={`text-sm font-medium tracking-widest uppercase ${textColor} hover:opacity-60 transition`}
          >
            Studio
          </Link>
        </div>
      </div>
    </header>
  );
}
