import { siteConfig } from "@/config";
import Link from "next/link";

export const metadata = {
  title: "Studio - SAY Creative",
  description: "About SAY Creative studio - branding, social media, and AI.",
};

export default function StudioPage() {
  return (
    <div className="bg-[#0c0c0c] text-white min-h-screen">
      {/* Top Section — About + Contact */}
      <section className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-32 pb-20">
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
          {/* About — spans 2 columns */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-medium tracking-[0.3em] uppercase text-neutral-400 mb-10">
              About the Studio
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <p className="text-[15px] leading-relaxed text-neutral-300">
                SAY Creative is a multidisciplinary design studio where bold
                thinking meets meticulous craft. We specialize in building brands
                that resonate — from initial strategy through every visual
                touchpoint. Our work spans branding, digital, social media, and
                emerging AI-driven creative tools, always guided by a belief that
                design should feel intentional, never accidental.
              </p>
              <p className="text-[15px] leading-relaxed text-neutral-300">
                We are a close-knit team of designers, strategists, and makers
                who care deeply about the details. We partner with businesses
                that value authenticity — brands that want to stand for something
                real. Our process is collaborative, transparent, and built around
                understanding your story before shaping how the world sees it.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-medium tracking-[0.3em] uppercase text-neutral-400 mb-10">
              Get in Touch
            </h2>
            <div className="space-y-5 text-[15px]">
              <p className="text-neutral-300">{siteConfig.contact.address}</p>
              <div>
                <p className="text-neutral-400 text-sm mb-1">For inquiries</p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-neutral-300 hover:text-white transition"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-neutral-300 hover:text-white transition underline underline-offset-4 decoration-neutral-600 block"
              >
                {siteConfig.contact.email}
              </a>
              <div className="flex gap-5 pt-4">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-white transition text-sm tracking-wide uppercase"
                  >
                    Instagram
                  </a>
                )}
                {siteConfig.social.tiktok && (
                  <a
                    href={siteConfig.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-white transition text-sm tracking-wide uppercase"
                  >
                    TikTok
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="border-t border-neutral-800" />
      </div>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-24">
        <h2 className="text-xs font-medium tracking-[0.3em] uppercase text-neutral-400 mb-16">
          What We Do
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
          <div>
            <h3 className="text-base font-semibold tracking-wide uppercase mb-4">
              Brand Strategy
            </h3>
            <p className="text-[15px] leading-relaxed text-neutral-400">
              We define the foundation — positioning, voice, and vision. Through
              research and strategic thinking, we uncover what makes your brand
              distinct and build a roadmap that guides every creative decision.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-wide uppercase mb-4">
              Visual Identity
            </h3>
            <p className="text-[15px] leading-relaxed text-neutral-400">
              From logo systems to full brand guidelines, we craft visual
              languages that communicate with clarity and character. Every element
              is designed to work together as a cohesive whole.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-wide uppercase mb-4">
              Digital Design
            </h3>
            <p className="text-[15px] leading-relaxed text-neutral-400">
              Websites, campaigns, and digital experiences that feel considered
              and purposeful. We bring brands to life across screens with design
              that performs as well as it looks.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-wide uppercase mb-4">
              Social Media
            </h3>
            <p className="text-[15px] leading-relaxed text-neutral-400">
              Content strategy, art direction, and management across platforms.
              We build social presences that feel authentic to the brand and
              create genuine connection with audiences.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-wide uppercase mb-4">
              Motion & Video
            </h3>
            <p className="text-[15px] leading-relaxed text-neutral-400">
              From short-form content to brand films, we handle art direction,
              production, and post. Moving images that capture attention and
              communicate with impact.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-wide uppercase mb-4">
              AI Creative
            </h3>
            <p className="text-[15px] leading-relaxed text-neutral-400">
              We integrate AI tools into the creative process — from generative
              visuals to smart content workflows. New technology in service of
              better design, not as a replacement for it.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
}
