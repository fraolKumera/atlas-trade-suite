import { ArrowRight, Ship, Plane, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/lib/useReveal";

function Metric({
  target,
  suffix,
  decimals = 0,
  label,
}: {
  target: number;
  suffix: string;
  decimals?: number;
  label: string;
}) {
  const { ref, value } = useCountUp(target);
  return (
    <div className="min-w-0 px-2 text-center">
      <span
        ref={ref}
        className="block text-2xl font-extrabold tracking-tight text-gradient sm:text-3xl"
      >
        {value.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </span>
      <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function TradeBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-leaf/20 blur-3xl" />
      <div className="absolute -right-24 top-24 h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-3xl" />
      <svg
        viewBox="0 0 1200 620"
        className="absolute inset-0 h-full w-full opacity-[0.55]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="routeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--leaf)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        <g className="spin-slow" style={{ transformOrigin: "870px 300px" }}>
          <circle
            cx="870"
            cy="300"
            r="210"
            fill="none"
            stroke="var(--leaf)"
            strokeOpacity="0.35"
          />
          <ellipse
            cx="870"
            cy="300"
            rx="210"
            ry="80"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.35"
          />
          <ellipse
            cx="870"
            cy="300"
            rx="120"
            ry="210"
            fill="none"
            stroke="var(--leaf)"
            strokeOpacity="0.25"
          />
          <ellipse
            cx="870"
            cy="300"
            rx="205"
            ry="205"
            fill="none"
            stroke="var(--primary)"
            strokeOpacity="0.12"
          />
        </g>
        {[
          "M60,430 C260,300 420,470 660,330",
          "M120,520 C380,460 520,240 900,180",
          "M40,250 C300,180 520,360 1080,240",
          "M200,590 C520,540 760,420 1160,430",
        ].map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="1.6"
            className="route-dash"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
        {[
          [60, 430],
          [660, 330],
          [900, 180],
          [1080, 240],
          [200, 590],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="4" fill="var(--accent)" />
            <circle
              cx={cx}
              cy={cy}
              r="6"
              fill="var(--leaf)"
              fillOpacity="0.4"
              className="pulse-ring"
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-28 pt-36 sm:pt-44">
      <TradeBackdrop />
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-3xl">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Globe2 className="h-3.5 w-3.5 text-leaf" />
            Sourcing &amp; logistics across 4 continents
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Move commodities across borders with{" "}
            <span className="text-gradient">verified certainty</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Kokora Import &amp; Export handles sourcing, inspection, freight forwarding and
            customs clearance end-to-end — with documented compliance at every checkpoint your
            buyers and banks require.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-[var(--shadow-glow)]">
              <a href="#quote">
                Request a Quote <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass border-border">
              <a href="#commodities">Explore Commodities</a>
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="glass-strong float-slow gradient-border grid grid-cols-3 items-center rounded-3xl px-3 py-6">
            <Metric target={52} suffix="+" label="Countries covered" />
            <Metric target={10} suffix="K+" label="Metric tons shipped" />
            <Metric target={99.8} suffix="%" decimals={1} label="On-time delivery" />
          </div>
          <div className="glass grid grid-cols-2 gap-3 rounded-3xl p-4">
            <div className="rounded-2xl bg-secondary/60 p-4">
              <Ship className="h-5 w-5 text-leaf" />
              <p className="mt-3 text-sm font-semibold">Ocean FCL / LCL</p>
              <p className="text-xs text-muted-foreground">18–34 day corridors</p>
            </div>
            <div className="rounded-2xl bg-secondary/60 p-4">
              <Plane className="h-5 w-5 text-accent" />
              <p className="mt-3 text-sm font-semibold">Air Freight</p>
              <p className="text-xs text-muted-foreground">48–96 hr priority</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
