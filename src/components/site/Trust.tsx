import { ShieldCheck, Award, FileBadge, Globe, Scale, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BADGES = [
  { icon: Award, title: "ISO 9001:2015", sub: "Quality management" },
  { icon: ShieldCheck, title: "ISO 28000", sub: "Supply chain security" },
  { icon: FileBadge, title: "AEO Certified", sub: "Authorised operator" },
  { icon: Globe, title: "FIATA Member", sub: "Freight forwarding" },
  { icon: Scale, title: "ICC Incoterms 2020", sub: "Contract compliance" },
  { icon: Lock, title: "C-TPAT Aligned", sub: "Cargo screening" },
];

const FAQS = [
  {
    q: "Which Incoterms do you trade on?",
    a: "We routinely quote EXW, FOB, CFR, CIF, DAP and DDP. FOB and CIF are the most common for ocean shipments; for air we default to CPT unless your bank requires otherwise. The agreed Incoterm is stated on the proforma invoice and mirrored in the transport documents.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Irrevocable Letter of Credit (L/C) at sight or usance through a first-class bank, T/T with an agreed advance, CAD (Cash Against Documents), and escrow for first-time counterparties. We do not release original documents before the agreed payment trigger is met.",
  },
  {
    q: "How is quality verified before shipment?",
    a: "Every lot is sampled and tested against the contract specification, with SGS, Intertek or Bureau Veritas inspection where required. You receive the inspection certificate, lab report and container loading photos before the vessel sails.",
  },
  {
    q: "Which documents come with each shipment?",
    a: "Commercial invoice, packing list, bill of lading or air waybill, certificate of origin, phytosanitary or health certificate where applicable, insurance certificate and the inspection report — issued as an L/C-compliant set.",
  },
  {
    q: "Who handles customs clearance at destination?",
    a: "We can act through our licensed brokerage network for DAP/DDP terms, or hand over a complete document pack to your nominated broker. HS classification and duty exposure are reviewed before booking.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="section-pad">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Trust &amp; compliance
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Accredited, documented, auditable
          </h2>
        </div>

        <div className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((b) => (
            <div key={b.title} className="lift glass flex items-center gap-4 rounded-3xl p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <b.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold">{b.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{b.sub}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <h3 className="text-xl font-bold">Trade terms, answered</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The questions international buyers ask us most, before the first purchase order.
            </p>
          </div>
          <Accordion type="single" collapsible className="glass rounded-3xl px-5">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border">
                <AccordionTrigger className="text-left text-sm font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
