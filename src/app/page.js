import { getAllProjects } from "@/lib/projects";
import HomeWork from "@/components/HomeWork";
import HeroVideo from "@/components/HeroVideo";
import { siteConfig } from "@/config";

export default async function Home() {
  const projects = await getAllProjects({ thumbnailWidth: 1400 });
  return (
    <div id="top" className="say-home">
      <section className="say-hero" aria-label="SAY Creative studio showreel">
        <HeroVideo />
        <div className="say-hero-bottom"><p>Good ideas.<br />Distinctive identities.</p><a href="#selected-work">Explore our work <span aria-hidden="true">↓</span></a></div>
      </section>
      <div className="say-home-content">
        <HomeWork projects={projects} />
        <footer className="say-footer">
          <div className="say-section-note"><span><i /> Next up: your next big idea.</span><span>Open for conversations</span></div>
          <a className="say-contact-title" href={`mailto:${siteConfig.contact.email}`}>Have something<br />to <em>SAY?</em><span aria-hidden="true">↗</span></a>
          <div className="say-footer-bottom"><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a><a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><span>SAY Creative © {new Date().getFullYear()}</span></div>
        </footer>
      </div>
    </div>
  );
}
