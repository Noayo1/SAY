"use client";
import { useRef, useEffect } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Some browsers block even muted autoplay until user interaction
      const playOnInteract = () => {
        video.play();
        document.removeEventListener("touchstart", playOnInteract);
        document.removeEventListener("click", playOnInteract);
      };
      document.addEventListener("touchstart", playOnInteract, { once: true });
      document.addEventListener("click", playOnInteract, { once: true });
    });
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      webkit-playsinline=""
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
