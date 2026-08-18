import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import agri from "@/assets/agri.jpg";
import minerals from "@/assets/minerals.jpg";
import manufactured from "@/assets/manufactured.jpg";
import raw from "@/assets/raw.jpg";

const CATEGORIES = [
  "All",
  "Agricultural Produce",
  "Minerals",
  "Manufactured Goods",
  "Raw Materials",
] as const;

type Category = (typeof CATEGORIES)[number];

const PRODUCTS: {
  name: string;
  category: Exclude<Category, "All">;
  image: string;
  specs: string;
  season: string;
}[] = [
  {
    name: "Washed Arabica Coffee",
    category: "Agricultural Produce",
    image: agri,
    specs: "Grade 1–2 · 60kg jute · Screen 15+",
    season: "Peak: Nov – Mar",
  },
  {
    name: "Humera Sesame Seed",
    category: "Agricultural Produce",
    image: agri,
    specs: "99.5% purity · FFA <2% · 50kg PP",
    season: "Peak: Dec – Apr",
  },
  {
    name: "Tantalum & Ore Concentrate",
    category: "Minerals",
    image: minerals,
    specs: "Assay certified · Drum packed",
    season: "Year-round",
  },
  {
    name: "Rough Gemstone Lots",
    category: "Minerals",
    image: minerals,
    specs: "Graded lots · Origin documented",
    season: "Year-round",
  },
  {
    name: "Palletised Consumer Goods",
    category: "Manufactured Goods",
    image: manufactured,
    specs: "Shrink-wrapped · Export cartons",
    season: "Year-round",
  },
  {
    name: "Industrial Spare Parts",
    category: "Manufactured Goods",
    image: manufactured,
    specs: "HS-coded · Crated · Insured",
    season: "Year-round",
  },
  {
    name: "Cotton Bales",
    category: "Raw Materials",
    image: raw,
    specs: "Middling · 220kg bales",
    season: "Peak: Oct – Feb",
  },
  {
    name: "Wet Blue Hides & Skins",
    category: "Raw Materials",
    image: raw,
    specs: "Grade A/B · Chilled logistics",
    season: "Year-round",
  },
];

export function Commodities() {
  const [active, setActive] = useState<Category>("All");
  const list = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section id="commodities" className="section-pad bg-surface/60">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Catalogue
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Commodities we source and ship
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every lot is inspected pre-shipment, with certificates of origin, phytosanitary and
              quality documentation issued before loading.
            </p>
          </div>
          <div className="glass flex flex-wrap gap-1 rounded-2xl p-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                  active === c
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <article
              key={p.name}
              className="lift group overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <Badge className="absolute left-3 top-3 rounded-full bg-accent text-accent-foreground">
                  {p.season}
                </Badge>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {p.category}
                </p>
                <h3 className="mt-1 text-base font-bold leading-snug">{p.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{p.specs}</p>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="mt-4 px-0 text-primary hover:bg-transparent"
                >
                  <a href="#quote">
                    Inquire about product
                    <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
