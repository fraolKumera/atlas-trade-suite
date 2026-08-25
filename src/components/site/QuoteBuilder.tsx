import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEST_HUBS, HUBS, ORIGIN_HUB_ID } from "./RouteVisualizer";

const CARGO = ["Agricultural Produce", "Manufactured Goods"];
const METHODS = ["Air Freight", "Ocean Freight — FCL", "Ocean Freight — LCL", "Overland"];
const STEPS = ["Cargo", "Method", "Route", "Contact"];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  company: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(1000).optional(),
});

export function QuoteBuilder() {
  const [step, setStep] = useState(0);
  const [cargo, setCargo] = useState<string>("Agricultural Produce");
  const [weight, setWeight] = useState("24");
  const [method, setMethod] = useState<string>("Ocean Freight — FCL");
  const [dest, setDest] = useState("rotterdam");
  const [form, setForm] = useState({ name: "", email: "", company: "", notes: "" });
  const [sent, setSent] = useState(false);

  const originName = HUBS.find((h) => h.id === ORIGIN_HUB_ID)?.name ?? "Addis Ababa";
  const destName = HUBS.find((h) => h.id === dest)?.name ?? "";

  const submit = () => {
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setSent(true);
    toast.success("Quote request received — our trade desk replies within one business day.");
  };

  return (
    <section id="quote" className="section-pad bg-surface/60">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Instant quote
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Build your freight quote in four steps
          </h2>
        </div>

        <div className="reveal mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="glass-strong gradient-border rounded-3xl p-6 sm:p-8">
            <ol className="flex flex-wrap items-center gap-2">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                      i <= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      i <= step ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s}
                  </span>
                  {i < STEPS.length - 1 && <span className="h-px w-6 bg-border" />}
                </li>
              ))}
            </ol>

            <div className="mt-7 min-h-[15rem]">
              {step === 0 && (
                <div className="grid gap-4 animate-fade-in">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Cargo category
                    </label>
                    <Select value={cargo} onValueChange={setCargo}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CARGO.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Estimated weight / volume (metric tons)
                    </label>
                    <Input
                      className="mt-2"
                      inputMode="decimal"
                      value={weight}
                      maxLength={8}
                      onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ""))}
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {METHODS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`rounded-2xl border p-4 text-left text-sm font-semibold transition-colors ${
                        method === m
                          ? "border-transparent bg-primary text-primary-foreground"
                          : "border-border bg-card hover:bg-secondary"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Origin
                    </label>
                    <p className="mt-2 rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm font-medium">
                      Ethiopia — {originName}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Destination
                    </label>
                    <Select value={dest} onValueChange={setDest}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DEST_HUBS.map((h) => (
                          <SelectItem key={h.id} value={h.id}>
                            {h.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Full name"
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Input
                    placeholder="Work email"
                    type="email"
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <Input
                    placeholder="Company (optional)"
                    maxLength={120}
                    className="sm:col-span-2"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                  <Textarea
                    placeholder="Specifications, Incoterms, target delivery window…"
                    maxLength={1000}
                    className="sm:col-span-2"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              {step < 3 ? (
                <Button onClick={() => setStep((s) => Math.min(3, s + 1))}>
                  Continue <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={submit} disabled={sent} className="shadow-[var(--shadow-glow)]">
                  {sent ? (
                    <>
                      <CheckCircle2 className="mr-1 h-4 w-4" /> Request sent
                    </>
                  ) : (
                    <>
                      <Send className="mr-1 h-4 w-4" /> Send request
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          <aside className="glass grid content-start gap-4 rounded-3xl p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Summary preview
            </p>
            {[
              ["Cargo", cargo],
              ["Volume", `${weight || "—"} MT`],
              ["Method", method],
              ["Route", `Ethiopia → ${destName}`],
              ["Contact", form.name || "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-4 border-b border-border pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {k}
                </span>
                <span className="text-right text-sm font-semibold">{v}</span>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              Rates are confirmed by our trade desk against live carrier schedules, duties and
              inspection scope. No obligation.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
