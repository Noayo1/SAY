import { siteConfig } from "@/config";
import ScrollingBanner from "@/components/ScrollingBanner";

export default function Home() {
  return (
    <>
      {/* Scrolling Banner */}
      <ScrollingBanner text="WELCOME ALL" icon="→" speed="30s" />
    </>
  );
}
