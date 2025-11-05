import { siteConfig } from "@/config";
import ScrollingBanner from "@/components/ScrollingBanner";
import AccordionSection from "@/components/AccordionSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Scrolling Banner */}
      <ScrollingBanner text="WELCOME ALL" icon="→" speed="30s" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section with Text and Image */}
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Side - Text */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              WE WORK WITH INDUSTRY LEADERS TO TAKE BIG IDEAS AND TURN THEM INTO
              BEAUTIFUL BRANDS THAT HAVE TRUE REASON FOR BEING
            </h1>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-md">
              {/* Add your product image to /public/product-image.png and uncomment below */}
              {/* 
              <Image 
                src="/product-image.png" 
                alt="Product"
                width={500}
                height={500}
                className="w-full h-auto"
                priority
              />
              */}

              {/* Placeholder - Remove when you add your image */}
              <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* WORK Section */}
        <AccordionSection title="WORK" id="work">
          <ProjectsGrid />
        </AccordionSection>

        {/* ABOUT Section */}
        <AccordionSection title="ABOUT" id="about">
          <div className="max-w-4xl">
            <p className="text-xl md:text-2xl leading-relaxed mb-6">
              SAY Creative is a brand design studio that partners with industry
              leaders to create meaningful brands with purpose.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              We believe in the power of strategic thinking combined with
              beautiful execution. Our approach focuses on understanding your
              audience, defining your unique value, and bringing it to life
              through compelling design.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              From brand strategy to visual identity, packaging to digital
              experiences, we craft brands that resonate and endure.
            </p>
          </div>
        </AccordionSection>

        {/* CONTACT Section */}
        <AccordionSection title="CONTACT" id="contact" defaultOpen={false}>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-1">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-xl hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Phone</p>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-xl hover:underline"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Address</p>
                  <p className="text-xl">{siteConfig.contact.address}</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-6">
                  {siteConfig.social.instagram && (
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-black transition"
                    >
                      Instagram
                    </a>
                  )}
                  {siteConfig.social.tiktok && (
                    <a
                      href={siteConfig.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-black transition"
                    >
                      TikTok
                    </a>
                  )}
                  {siteConfig.social.whatsapp && (
                    <a
                      href={siteConfig.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-black transition"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </AccordionSection>

        {/* Bottom Border */}
        <div className="border-b border-gray-300 mt-0"></div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </>
  );
}
