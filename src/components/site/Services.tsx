import { useState } from "react";
import {
  BadgeCheck,
  Boxes,
  FileCheck2,
  Ship,
  Sprout,
  ScanLine,
  Stamp,
  Truck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SERVICES = [
  {
    id: "freight",
    label: "Freight Forwarding",
    icon: Ship,
    body: "Consolidated FCL, LCL, air and overland movements with vetted carriers, booked against contracted rates and tracked to the door.",
    points: ["Carrier allocation & booking", "Door-to-door tracking", "Cargo insurance arrangement"],
  },
  {
    id: "customs",
    label: "Custom Clearance",
    icon: Stamp,
    body: "Licensed brokerage on both ends: HS classification, duty optimisation, and complete documentation packs for banks and authorities.",
    points: ["HS code classification", "Duty & tariff review", "L/C-compliant document sets"],
  },
  {
    id: "qa",
    label: "Quality Assurance",
    icon: BadgeCheck,
    body: "Independent pre-shipment inspection, lab assay and container loading supervision, with photographic evidence in every report.",
    points: ["SGS / Intertek coordination", "Lab assay & moisture testing", "Loading supervision reports"],
  },
  {
    id: "warehouse",
    label: "Warehousing",
    icon: Boxes,
    body: "Bonded and ambient storage at origin and transit hubs, with fumigation, re-bagging, palletising and inventory visibility.",
    points: ["Bonded & ambient storage", "Fumigation & re-bagging", "Live inventory reporting"],
  },
];

const TIMELINE = [
  { icon: Sprout, title: "Sourcing", text: "Supplier vetting, sampling and contracted pricing." },
  { icon: Truck, title: "Logistics", text: "Inland haulage, consolidation and booking." },
  { icon: ScanLine, title: "Quality Control", text: "Third-party inspection and lab certification." },
  { icon: FileCheck2, title: "Customs", text: "Export/import clearance and document release." },
  { icon: Ship, title: "Final Delivery", text: "Port handover or DDP delivery to consignee." },
];

export function Services() {
  const [step, setStep] = useState(0);

  return (
    <section id="services" className="section-pad">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Capabilities
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Logistics handled as one accountable chain
          </h2>
        </div>

        <Tabs defaultValue="freight" className="reveal mt-10">
          <TabsList className="glass h-auto flex-wrap justify-start gap-1 rounded-2xl p-1.5">
            {SERVICES.map((s) => (
              <TabsTrigger key={s.id} value={s.id} className="rounded-xl px-4 py-2 text-xs sm:text-sm">
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {SERVICES.map((s) => (
            <TabsContent key={s.id} value={s.id} className="mt-5">
              <div className="glass-strong gradient-border grid gap-6 rounded-3xl p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="min-w-0">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{s.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
                <ul className="grid content-start gap-3">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 rounded-2xl bg-secondary/60 px-4 py-3 text-sm font-medium"
                    >
                      <BadgeCheck className="h-4 w-4 shrink-0 text-leaf" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="reveal mt-14">
          <h3 className="text-lg font-bold">Shipment lifecycle</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {TIMELINE.map((t, i) => {
              const active = i <= step;
              return (
                <button
                  key={t.title}
                  type="button"
                  onMouseEnter={() => setStep(i)}
                  onFocus={() => setStep(i)}
                  onClick={() => setStep(i)}
                  className={`lift relative rounded-3xl border p-5 text-left transition-colors ${
                    active
                      ? "border-transparent bg-card shadow-[var(--shadow-glow)]"
                      : "border-border bg-card/50"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-2xl ${
                      active ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <t.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Step {i + 1}
                  </p>
                  <p className="text-sm font-bold">{t.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.text}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
