import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { siteConfig } from "@/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: siteConfig.companyName,
  description: siteConfig.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
