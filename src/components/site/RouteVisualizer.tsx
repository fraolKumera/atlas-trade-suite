import { useMemo, useState } from "react";
import { Clock, Container, MapPin, Route } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Hub = { id: string; name: string; region: string; x: number; y: number };

export const ORIGIN_HUB_ID = "addis";

export const HUBS: Hub[] = [
  { id: "addis", name: "Addis Ababa", region: "East Africa", x: 58.5, y: 58 },
  { id: "djibouti", name: "Djibouti", region: "East Africa", x: 60, y: 55 },
  { id: "jebelali", name: "Jebel Ali", region: "Middle East", x: 66, y: 48 },
  { id: "rotterdam", name: "Rotterdam", region: "Europe", x: 48.5, y: 27 },
  { id: "genoa", name: "Genoa", region: "Europe", x: 50, y: 33 },
  { id: "shanghai", name: "Shanghai", region: "East Asia", x: 82, y: 40 },
  { id: "mumbai", name: "Mumbai", region: "South Asia", x: 69.5, y: 48 },
  { id: "newyork", name: "New York", region: "North America", x: 27, y: 34 },
  { id: "santos", name: "Santos", region: "South America", x: 33, y: 71 },
  { id: "durban", name: "Durban", region: "Southern Africa", x: 55, y: 76 },
];

export const DEST_HUBS = HUBS.filter((h) => h.id !== ORIGIN_HUB_ID);

const CARGO: Record<string, string[]> = {
  "East Africa": ["Coffee", "Sesame", "Pulses", "Leather"],
  "Middle East": ["Pulses", "Livestock feed", "Manufactured goods"],
  Europe: ["Specialty coffee", "Oilseeds", "Textiles"],
  "East Asia": ["Industrial inputs", "Oilseeds", "Sesame"],
  "South Asia": ["Sesame", "Soybean", "Fertilizer"],
  "North America": ["Specialty coffee", "Spices", "Honey"],
  "South America": ["Fertilizer", "Machinery"],
  "Southern Africa": ["Manufactured goods", "Chemicals"],
};

function distance(a: Hub, b: Hub) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function RouteVisualizer() {
  const [destId, setDestId] = useState("rotterdam");

  const origin = HUBS.find((h) => h.id === ORIGIN_HUB_ID)!;
  const dest = HUBS.find((h) => h.id === destId)!;

  const stats = useMemo(() => {
    const d = distance(origin, dest);
    const ocean = Math.max(9, Math.round(d * 0.85 + 6));
    const air = Math.max(2, Math.round(d * 0.09 + 1.5));
    const cargo = Array.from(
      new Set([...(CARGO[origin.region] ?? []), ...(CARGO[dest.region] ?? [])]),
    ).slice(0, 5);
    return { ocean, air, cargo, same: origin.id === dest.id };
  }, [origin, dest]);

  const mid = { x: (origin.x + dest.x) / 2, y: Math.min(origin.y, dest.y) - 12 };

  return (
    <section id="routes" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Trade corridors
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Global trade route visualizer
          </h2>
          <p className="mt-3 text-muted-foreground">
            All shipments originate in Ethiopia. Pick a destination hub — or tap a node on the map —
            to preview transit windows and the cargo classes we already move on that corridor.
          </p>
        </div>

        <div className="reveal mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="glass-strong gradient-border relative overflow-hidden rounded-3xl p-4">
            <svg viewBox="0 0 100 100" className="h-[22rem] w-full sm:h-[26rem]">
              <defs>
                <linearGradient id="arcGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--leaf)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>
              {/* stylised latitude/longitude grid */}
              {Array.from({ length: 9 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="2"
                  x2="98"
                  y1={10 + i * 10}
                  y2={10 + i * 10}
                  stroke="currentColor"
                  strokeWidth="0.12"
                  className="text-muted-foreground/40"
                />
              ))}
              {Array.from({ length: 13 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  y1="6"
                  y2="94"
                  x1={4 + i * 8}
                  x2={4 + i * 8}
                  stroke="currentColor"
                  strokeWidth="0.12"
                  className="text-muted-foreground/40"
                />
              ))}
              <ellipse
                cx="50"
                cy="50"
                rx="48"
                ry="44"
                fill="none"
                stroke="var(--leaf)"
                strokeOpacity="0.25"
                strokeWidth="0.3"
              />

              {!stats.same && (
                <path
                  d={`M${origin.x},${origin.y} Q${mid.x},${mid.y} ${dest.x},${dest.y}`}
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="0.7"
                  className="route-dash"
                  strokeLinecap="round"
                />
              )}

              {HUBS.map((hub) => {
                const isOrigin = hub.id === ORIGIN_HUB_ID;
                const active = isOrigin || hub.id === destId;
                return (
                  <g
                    key={hub.id}
                    onClick={() => {
                      if (!isOrigin) setDestId(hub.id);
                    }}
                    className={isOrigin ? "cursor-default" : "cursor-pointer"}
                  >
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={active ? 1.5 : 1}
                      fill={active ? "var(--accent)" : "var(--leaf)"}
                    />
                    {active && (
                      <circle
                        cx={hub.x}
                        cy={hub.y}
                        r="1.6"
                        fill="var(--accent)"
                        fillOpacity="0.45"
                        className="pulse-ring"
                        style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
                      />
                    )}
                    <text
                      x={hub.x}
                      y={hub.y - 2.4}
                      textAnchor="middle"
                      fontSize="2.2"
                      className={active ? "fill-foreground" : "fill-muted-foreground"}
                      fontWeight={active ? 700 : 500}
                    >
                      {hub.name}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="px-2 pb-1 text-xs text-muted-foreground">
              Origin is always Ethiopia. Tap a hub to set the destination.
            </p>
          </div>

          <div className="grid content-start gap-4">
            <div className="glass rounded-3xl p-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Origin hub
              </label>
              <p className="mt-2 rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm font-medium">
                Ethiopia — Addis Ababa
              </p>

              <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Destination hub
              </label>
              <Select value={destId} onValueChange={setDestId}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEST_HUBS.map((h) => (
                    <SelectItem key={h.id} value={h.id}>
                      {h.name} — {h.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="glass grid gap-4 rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <Route className="h-4 w-4 shrink-0 text-leaf" />
                <p className="min-w-0 text-sm font-semibold">
                  Ethiopia <span className="text-muted-foreground">→</span> {dest.name}
                </p>
              </div>
              {stats.same ? (
                <p className="text-sm text-muted-foreground">
                  Select two different hubs to preview a corridor.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-secondary/60 p-3">
                      <Clock className="h-4 w-4 text-accent" />
                      <p className="mt-2 text-lg font-bold">{stats.ocean} days</p>
                      <p className="text-xs text-muted-foreground">Ocean transit (est.)</p>
                    </div>
                    <div className="rounded-2xl bg-secondary/60 p-3">
                      <Clock className="h-4 w-4 text-leaf" />
                      <p className="mt-2 text-lg font-bold">{stats.air} days</p>
                      <p className="text-xs text-muted-foreground">Air transit (est.)</p>
                    </div>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Container className="h-3.5 w-3.5" /> Supported cargo
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {stats.cargo.map((c) => (
                        <Badge key={c} variant="secondary" className="rounded-full">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="flex items-start gap-2 text-xs text-muted-foreground">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    Indicative port-to-port times; confirmed on quotation with carrier schedules.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
