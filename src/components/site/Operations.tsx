import humeraWarehouse from "@/assets/photos/humera-sesame-warehouse.png";
import sesameBulk from "@/assets/photos/sesame-bulk-handling.png";
import grainBagging from "@/assets/photos/grain-bagging.png";
import warehouseBags from "@/assets/photos/warehouse-bags-ethiopia.png";
import truckTeal from "@/assets/photos/truck-teal-cargo.png";
import fleetWorkshop from "@/assets/photos/fleet-workshop.png";
import fleetMaintenance from "@/assets/photos/fleet-maintenance.png";
import truckLogistics from "@/assets/photos/truck-logistics.png";

const SHOTS = [
  {
    src: humeraWarehouse,
    alt: "White Humera sesame seed bags stacked in warehouse",
    caption: "Humera sesame — bonded storage",
    span: "lg:col-span-2",
  },
  {
    src: sesameBulk,
    alt: "Bulk white sesame seed pile with export bags",
    caption: "Bulk handling & re-bagging",
    span: "",
  },
  {
    src: grainBagging,
    alt: "Workers bagging harvested grain at origin",
    caption: "Origin bagging",
    span: "",
  },
  {
    src: warehouseBags,
    alt: "Ethiopian export bags stacked in warehouse",
    caption: "Export-ready PP bags",
    span: "",
  },
  {
    src: truckTeal,
    alt: "Teal cargo truck in logistics workshop",
    caption: "Inland haulage fleet",
    span: "",
  },
  {
    src: fleetWorkshop,
    alt: "Heavy-duty trucks lined up in workshop",
    caption: "Fleet readiness",
    span: "lg:col-span-2",
  },
  {
    src: fleetMaintenance,
    alt: "Workshop maintenance on transport trucks",
    caption: "Workshop maintenance",
    span: "",
  },
  {
    src: truckLogistics,
    alt: "Teal stake-bed truck prepared for cargo",
    caption: "Door-to-port moves",
    span: "",
  },
] as const;

export function Operations() {
  return (
    <section id="operations" className="section-pad bg-surface/60">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            On the ground
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Warehouses, fleets and origin handling
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real shots from our storage yards and logistics workshops — the same facilities that
            receive, inspect and move your lots.
          </p>
        </div>

        <div className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHOTS.map((shot) => (
            <figure
              key={shot.caption}
              className={`lift group relative overflow-hidden rounded-3xl border border-border bg-card ${shot.span}`}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                width={1200}
                height={800}
                loading="lazy"
                className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-56 lg:h-60"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent px-4 pb-3.5 pt-10 text-sm font-semibold text-primary-foreground">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
