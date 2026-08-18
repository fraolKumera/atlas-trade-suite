import { useEffect, useState } from "react";
import { MessageCircle, Send, Paperclip, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/kokora-logo.jpg.asset.json";

const OFFICES = [
  {
    city: "Addis Ababa",
    country: "Ethiopia — Head Office",
    tz: "Africa/Addis_Ababa",
    address: "Bole Road, Friendship Tower, 7th Floor",
    phone: "+251 11 000 0000",
  },
  {
    city: "Djibouti",
    country: "Djibouti — Port Operations",
    tz: "Africa/Djibouti",
    address: "Doraleh Multipurpose Port, Block C",
    phone: "+253 21 00 00 00",
  },
  {
    city: "Dubai",
    country: "UAE — Trade Desk",
    tz: "Asia/Dubai",
    address: "Jebel Ali Free Zone, JAFZA One",
    phone: "+971 4 000 0000",
  },
  {
    city: "Rotterdam",
    country: "Netherlands — EU Office",
    tz: "Europe/Amsterdam",
    address: "Waalhaven Oostzijde, Port District",
    phone: "+31 10 000 0000",
  },
];

function LocalClock({ tz }: { tz: string }) {
  const [now, setNow] = useState<string>("--:--");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: tz,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [tz]);
  return <span className="font-mono text-sm font-bold text-accent">{now}</span>;
}

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().min(2, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

export function ContactCenter() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [file, setFile] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    toast.success("Inquiry sent — a trade specialist will respond within one business day.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setFile(null);
  };

  return (
    <section id="contact" className="section-pad bg-surface/60">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Contact
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Global inquiry center
          </h2>
        </div>

        <div className="reveal mt-10 grid gap-5 lg:grid-cols-2">
          <div className="grid content-start gap-4">
            <div className="glass-strong gradient-border rounded-3xl p-6">
              <h3 className="text-lg font-bold">Talk to the trade desk now</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Live weekdays 07:00–19:00 EAT. Send specs, target volume and destination port.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button asChild size="lg" className="shadow-[var(--shadow-glow)]">
                  <a href="https://wa.me/251110000000" target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="glass border-border">
                  <a href="https://t.me/kokoratrade" target="_blank" rel="noreferrer">
                    <Send className="mr-2 h-4 w-4" /> Telegram
                  </a>
                </Button>
              </div>
              <div className="mt-5 grid gap-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-leaf" /> +251 11 000 0000
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-leaf" /> trade@kokora-export.com
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {OFFICES.map((o) => (
                <div key={o.city} className="lift glass rounded-3xl p-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                    <p className="truncate text-sm font-bold">{o.city}</p>
                    <LocalClock tz={o.tz} />
                  </div>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{o.country}</p>
                  <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {o.address}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{o.phone}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="glass-strong grid content-start gap-4 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold">Send a detailed inquiry</h3>
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
            </div>
            <Input
              placeholder="Subject (e.g. CIF Rotterdam — 2x40HC sesame)"
              maxLength={150}
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
            <Textarea
              rows={6}
              placeholder="Specification, volume, Incoterm, destination port, target shipment window…"
              maxLength={1000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground transition-colors hover:bg-secondary/60">
              <Paperclip className="h-4 w-4 shrink-0 text-leaf" />
              <span className="min-w-0 truncate">
                {file ?? "Attach specification or RFQ (PDF, DOCX, XLSX)"}
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)}
              />
            </label>
            <Button type="submit" size="lg" className="shadow-[var(--shadow-glow)]">
              Submit inquiry
            </Button>
          </form>
        </div>
      </div>

      <footer className="mx-auto mt-16 max-w-7xl px-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-8 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={logo.url}
              alt="Kokora Import & Export logo"
              width={40}
              height={40}
              loading="lazy"
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-border"
            />
            <p className="min-w-0 truncate text-sm font-semibold">
              Kokora Import &amp; Export
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                © {new Date().getFullYear()}
              </span>
            </p>
          </div>
          <p className="text-xs text-muted-foreground">Licensed exporter &amp; freight forwarder</p>
        </div>
      </footer>
    </section>
  );
}
