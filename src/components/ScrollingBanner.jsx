"use client";

export default function ScrollingBanner({
  text = "COME JOIN US",
  speed = "30s",
  bgColor = "bg-white",
  textColor = "text-black",
}) {
  // Create enough copies to ensure seamless loop
  const repeatedText = Array(15).fill(null);

  return (
    <div
      className={`relative overflow-hidden ${bgColor} border-t border-b border-gray-200 py-4`}
    >
      <div className="flex">
        <div className="flex animate-scroll-left whitespace-nowrap">
          {repeatedText.map((_, i) => (
            <div key={`scroll-1-${i}`} className="flex items-center shrink-0">
              <span
                className={`text-2xl md:text-4xl font-light tracking-wider ${textColor} px-6`}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div
          className="flex animate-scroll-left whitespace-nowrap"
          aria-hidden="true"
        >
          {repeatedText.map((_, i) => (
            <div key={`scroll-2-${i}`} className="flex items-center shrink-0">
              <span
                className={`text-2xl md:text-4xl font-light tracking-wider ${textColor} px-6`}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left ${speed} linear infinite;
        }

        /* Optional: Pause on hover */
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
