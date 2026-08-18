import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { RouteVisualizer } from "@/components/site/RouteVisualizer";
import { Commodities } from "@/components/site/Commodities";
import { Services } from "@/components/site/Services";
import { QuoteBuilder } from "@/components/site/QuoteBuilder";
import { Trust } from "@/components/site/Trust";
import { ContactCenter } from "@/components/site/ContactCenter";
import { useRevealRoot } from "@/lib/useReveal";

const title = "Kokora Import & Export | Global Trade & Freight Forwarding";
const description =
  "Kokora Import & Export sources, inspects and ships commodities worldwide — freight forwarding, customs clearance, quality assurance and warehousing across 50+ countries.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRevealRoot<HTMLDivElement>();

  return (
    <div ref={ref} className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <RouteVisualizer />
        <Commodities />
        <Services />
        <QuoteBuilder />
        <Trust />
        <ContactCenter />
      </main>
    </div>
  );
}
