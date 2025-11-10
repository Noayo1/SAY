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
          {/* Left Side - Text - SMALLER SIZE */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
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
              We are SAY CREATIVE a young, passionate team that lives and
              breathes design, branding, and digital marketing.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              We believe that great visuals aren't just about looking good -
              they're about identity, connection, and emotion. Every brand we
              work with gets a personal, thoughtful process that starts with
              understanding its story, values, and vision, and ends with precise
              branding, strong visual language, and a digital presence that
              drives real results. From branding and design to social media
              management and paid advertising, we handle everything your
              business needs to stand out - and stand out right. In a world full
              of noise, we make sure your brand gets noticed for all the right
              reasons.
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

              {/* Social Icons - UPDATED WITH ICONS! */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {/* Instagram Icon */}
                  {siteConfig.social.instagram && (
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                      aria-label="Instagram"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}

                  {/* TikTok Icon */}
                  {siteConfig.social.tiktok && (
                    <a
                      href={siteConfig.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                      aria-label="TikTok"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                  )}

                  {/* WhatsApp Icon */}
                  {siteConfig.social.whatsapp && (
                    <a
                      href={siteConfig.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                      aria-label="WhatsApp"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
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