import { useMemo, useState, type ReactNode, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import {
AlertTriangle,
CheckCircle2,
Fingerprint,
LockKeyhole,
Mail,
Radio,
ShieldCheck,
Sparkles,
UserRound,
WalletCards,
} from "lucide-react";

import { TerminalButton } from "../components/ui/TerminalButton";
import { TerminalLoader } from "../components/ui/TerminalLoader";
import { useAuthStore } from "../store/authStore";
import type { Division } from "../types/passport";
import { FingerprintBadge } from "../components/ui/FingerprintBadge";

const divisions: { value: Division; label: string; desc: string }[] = [
{
value: "Cipher Analyst",
label: "Cipher Analyst",
desc: "Signal tracing, evidence graphs, contradiction hunting.",
},
{
value: "Field Observer",
label: "Field Observer",
desc: "Scene logs, surveillance notes, timeline reconstruction.",
},
{
value: "Interrogation Specialist",
label: "Interrogation Specialist",
desc: "Suspect pressure mapping and testimony fracture analysis.",
},
{
value: "Blackbox Intern",
label: "Blackbox Intern",
desc: "Entry-level clearance with whitelist priority training.",
},
{
value: "Protocol Director",
label: "Protocol Director",
desc: "High-trust operator role for alpha case orchestration.",
},
];

type RegisterFormState = {
username: string;
email: string;
password: string;
confirm: string;
division: Division;
referralCode: string;
};

function getErrorMessage(err: unknown) {
if (
typeof err === "object" &&
err !== null &&
"response" in err &&
typeof (err as any).response?.data?.message === "string"
) {
return (err as any).response.data.message;
}

if (err instanceof Error) return err.message;

return "Whitelist registration failed.";
}

export function RegisterPage() {
const navigate = useNavigate();
const register = useAuthStore((s) => s.register);

const [form, setForm] = useState<RegisterFormState>({
username: "",
email: "",
password: "",
confirm: "",
division: "Cipher Analyst",
referralCode: "",
});

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const passwordScore = useMemo(() => {
let score = 0;


if (form.password.length >= 8) score += 35;
if (/[A-Z]/.test(form.password)) score += 20;
if (/[0-9]/.test(form.password)) score += 20;
if (/[^A-Za-z0-9]/.test(form.password)) score += 25;

return Math.min(score, 100);


}, [form.password]);

const readiness = useMemo(() => {
let score = 0;

if (form.username.trim().length >= 3) score += 25;
if (/^\S+@\S+\.\S+$/.test(form.email.trim())) score += 25;
if (passwordScore >= 55) score += 25;
if (form.password && form.password === form.confirm) score += 25;

return score;

}, [form.username, form.email, form.password, form.confirm, passwordScore]);

async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
event.preventDefault();


if (loading) return;

setError("");

const username = form.username.trim();
const email = form.email.trim().toLowerCase();
const referralCode = form.referralCode.trim();

if (username.length < 3) {
  setError("Codename must be at least 3 characters.");
  return;
}

if (!/^\S+@\S+\.\S+$/.test(email)) {
  setError("Enter a valid secure email.");
  return;
}

if (form.password.length < 8) {
  setError("Password must be at least 8 characters.");
  return;
}

if (form.password !== form.confirm) {
  setError("Password confirmation does not match.");
  return;
}

setLoading(true);

try {
  await register({
    username,
    email,
    password: form.password,
    division: form.division,
    referralCode: referralCode || undefined,
  });

  navigate("/dashboard", { replace: true });
} catch (err: unknown) {
  setError(getErrorMessage(err));
} finally {
  setLoading(false);
}


}

if (loading) {
return ( <main className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-navy px-4 py-8 text-center"> 
<AuthBackground />
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 flex w-full max-w-md flex-col items-center space-y-8"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-cyan-neon/20 blur-3xl" />
        <FingerprintBadge className="relative z-10 mb-6 h-28 w-20 sm:h-32 sm:w-24 sm:scale-125" />
      </div>

      <div className="w-full rounded-2xl border border-cyan-neon/20 bg-slate-950/80 px-5 py-6 shadow-[0_0_50px_rgba(0,229,255,0.08)] sm:px-8">
        <TerminalLoader text="BIOMETRIC REGISTRATION..." />

        <div className="mt-6 space-y-3 animate-pulse">
          <h2 className="text-xl font-black uppercase tracking-[0.16em] text-cyan-neon sm:text-3xl sm:tracking-[0.22em]">
            CREATING AGENT ID
          </h2>

          <p className="font-mono text-xs text-slate-500 sm:text-sm">
            Terminal9X // Blackbox Division
          </p>
        </div>
      </div>
    </motion.div>
  </main>
);

}

return ( <main className="relative w-full overflow-x-hidden px-3 py-4 sm:px-4 sm:py-6 lg:px-6"> <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-blackbox-cyan/15 bg-black/25 shadow-[0_0_70px_rgba(0,229,255,0.08)] sm:rounded-[2rem]"> <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(0,229,255,0.20),transparent_28%),radial-gradient(circle_at_88%_80%,rgba(108,255,155,0.08),transparent_30%)]" /> <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(0,229,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.055)_1px,transparent_1px)] [background-size:28px_28px] sm:[background-size:34px_34px]" /> <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-1 bg-blackbox-cyan/70 shadow-[0_0_34px_rgba(0,229,255,0.75)] sm:block" />


    <div className="relative z-10 grid w-full lg:min-h-[720px] lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative min-w-0 overflow-hidden border-b border-blackbox-cyan/15 p-4 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,229,255,0.08),transparent_45%,rgba(108,255,155,0.05))]" />

        <div className="relative z-10 flex h-full min-w-0 flex-col justify-between gap-6 sm:gap-8">
          <div className="min-w-0">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-blackbox-cyan/20 bg-blackbox-cyan/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-blackbox-cyan sm:text-[10px] sm:tracking-[0.28em]">
              <Radio className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Whitelist Node Open</span>
            </div>

            <h1 className="max-w-full break-words text-[2rem] font-black uppercase leading-tight tracking-[0.08em] text-white sm:text-5xl sm:tracking-[0.14em] xl:text-6xl">
              Join T9X Whitelist
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
              Reserve your Terminal9X Agent Passport slot inside the Blackbox
              Division network. This creates your playable identity first,
              then keeps your testnet mint path ready.
            </p>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3">
              <AccessTile
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Identity"
                value="Agent ID"
              />
              <AccessTile
                icon={<WalletCards className="h-4 w-4" />}
                label="Passport"
                value="Free Slot"
              />
              <AccessTile
                icon={<Sparkles className="h-4 w-4" />}
                label="Status"
                value="Alpha WL"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-blackbox-cyan/25 bg-black/45 p-3 sm:rounded-3xl sm:p-4">
            <img
              src="/agents/unrevealed-agent.png"
              alt="Unrevealed Terminal9X agent"
              className="h-[230px] w-full rounded-xl object-cover object-center opacity-95 shadow-[0_0_40px_rgba(0,229,255,0.12)] sm:h-[320px] sm:rounded-2xl lg:h-[360px]"
              draggable={false}
            />

            <div className="pointer-events-none absolute inset-3 rounded-xl bg-gradient-to-t from-black via-transparent to-blackbox-cyan/10 sm:inset-4 sm:rounded-2xl" />

            <div className="absolute left-5 top-5 max-w-[calc(100%-2.5rem)] rounded border border-blackbox-cyan/25 bg-black/70 px-2 py-1 text-[8px] uppercase tracking-widest text-blackbox-cyan sm:left-8 sm:top-8 sm:text-[9px]">
              Unrevealed Agent Layer
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-blackbox-cyan/20 bg-black/75 p-3 backdrop-blur sm:bottom-8 sm:left-8 sm:right-8 sm:rounded-2xl sm:p-4">
              <div className="text-[8px] uppercase tracking-[0.22em] text-slate-500 sm:text-[9px] sm:tracking-[0.28em]">
                Assignment Preview
              </div>

              <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-blackbox-cyan sm:text-sm sm:tracking-widest">
                Passport first. Character imprint later.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-w-0 p-4 sm:p-8 lg:p-10">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-6 flex flex-col gap-4 border-b border-blackbox-cyan/15 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="break-words text-[9px] uppercase tracking-[0.22em] text-blackbox-cyan/70 sm:text-[10px] sm:tracking-[0.35em]">
                Terminal9X // Blackbox Division
              </p>

              <h2 className="mt-2 text-xl font-black uppercase tracking-[0.10em] text-white sm:text-2xl sm:tracking-[0.16em]">
                Access Registration
              </h2>
            </div>

            <div className="w-fit rounded-xl border border-blackbox-cyan/20 bg-blackbox-cyan/10 px-3 py-2 text-left sm:text-right">
              <div className="text-[9px] uppercase tracking-widest text-slate-500">
                Readiness
              </div>
              <div className="text-lg font-black text-blackbox-cyan">
                {readiness}%
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <TerminalInput
                icon={<UserRound className="h-4 w-4" />}
                label="Agent Codename"
                value={form.username}
                onChange={(value) =>
                  setForm((current) => ({ ...current, username: value }))
                }
                placeholder="DEM9X"
                required
              />

              <TerminalInput
                icon={<Mail className="h-4 w-4" />}
                label="Secure Email"
                type="email"
                value={form.email}
                onChange={(value) =>
                  setForm((current) => ({ ...current, email: value }))
                }
                placeholder="agent@terminal9x.fun"
                required
              />
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-blackbox-cyan/70 sm:text-xs sm:tracking-[0.24em]">
                <Fingerprint className="h-4 w-4 shrink-0" />
                <span>Choose Division</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {divisions.map((division) => {
                  const active = form.division === division.value;

                  return (
                    <button
                      key={division.value}
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          division: division.value,
                        }))
                      }
                      className={[
                        "relative min-w-0 overflow-hidden rounded-2xl border p-4 text-left transition-all active:scale-[0.99]",
                        active
                          ? "border-blackbox-cyan/50 bg-blackbox-cyan/10 shadow-[0_0_24px_rgba(0,229,255,0.12)]"
                          : "border-white/10 bg-white/[0.025] hover:border-blackbox-cyan/25",
                      ].join(" ")}
                    >
                      {active ? (
                        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-blackbox-cyan shadow-[0_0_12px_rgba(0,229,255,0.9)]" />
                      ) : null}

                      <div className="pr-5 text-[11px] font-black uppercase tracking-[0.12em] text-slate-100 sm:text-xs sm:tracking-widest">
                        {division.label}
                      </div>

                      <p className="mt-2 text-[11px] leading-5 text-slate-500">
                        {division.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <TerminalInput
                icon={<LockKeyhole className="h-4 w-4" />}
                label="Password"
                type="password"
                value={form.password}
                onChange={(value) =>
                  setForm((current) => ({ ...current, password: value }))
                }
                placeholder="minimum 8 characters"
                required
              />

              <TerminalInput
                icon={<LockKeyhole className="h-4 w-4" />}
                label="Confirm Password"
                type="password"
                value={form.confirm}
                onChange={(value) =>
                  setForm((current) => ({ ...current, confirm: value }))
                }
                placeholder="repeat access key"
                required
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="mb-2 flex items-center justify-between gap-3 text-[10px] uppercase tracking-widest text-slate-500">
                <span>Access Key Strength</span>
                <span className="text-blackbox-cyan">{passwordScore}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-blackbox-cyan shadow-[0_0_16px_rgba(0,229,255,0.8)] transition-all duration-300"
                  style={{ width: `${passwordScore}%` }}
                />
              </div>
            </div>

            <TerminalInput
              icon={<Radio className="h-4 w-4" />}
              label="Referral / Invite Code"
              value={form.referralCode}
              onChange={(value) =>
                setForm((current) => ({ ...current, referralCode: value }))
              }
              placeholder="optional"
            />

            {error ? (
              <div className="flex items-start gap-2 rounded-2xl border border-blackbox-red/30 bg-blackbox-red/10 p-4 text-sm text-blackbox-red">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            ) : null}

            <TerminalButton
              disabled={loading || readiness < 75}
              className="w-full py-4 text-xs sm:text-sm"
            >
              Join Whitelist + Create Passport
            </TerminalButton>
          </form>

          <div className="mt-5 flex flex-col gap-3 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <span className="inline-flex items-center justify-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blackbox-green" />
              No wallet required for registration
            </span>

            <span>
              Already cleared?{" "}
              <Link className="text-blackbox-cyan hover:text-white" to="/login">
                Login
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  </div>
</main>


);
}

function AccessTile({
icon,
label,
value,
}: {
icon: ReactNode;
label: string;
value: string;
}) {
return ( <div className="min-w-0 rounded-2xl border border-blackbox-cyan/20 bg-black/35 p-4"> <div className="mb-2 text-blackbox-cyan">{icon}</div> <div className="text-[9px] uppercase tracking-widest text-slate-500">
{label} </div> <div className="mt-1 break-words text-xs font-black uppercase tracking-widest text-slate-100">
{value} </div> </div>
);
}

function TerminalInput({
icon,
label,
value,
onChange,
type = "text",
placeholder,
required,
}: {
icon: ReactNode;
label: string;
value: string;
onChange: (value: string) => void;
type?: string;
placeholder?: string;
required?: boolean;
}) {
return ( <label className="block min-w-0"> <span className="mb-2 flex min-w-0 items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-blackbox-cyan/70 sm:text-xs sm:tracking-[0.22em]"> <span className="shrink-0">{icon}</span> <span className="truncate">{label}</span> </span>


  <input
    type={type}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    required={required}
    autoComplete={type === "password" ? "new-password" : undefined}
    className="min-h-12 w-full min-w-0 rounded-2xl border border-blackbox-cyan/20 bg-black/40 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-700 focus:border-blackbox-cyan focus:bg-black/60 focus:shadow-[0_0_22px_rgba(0,229,255,0.09)] sm:text-sm"
  />
</label>


);
}

const AuthBackground = () => {
return (
<> <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(0,229,255,0.12),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(34,197,94,0.08),transparent_26%)]" /> <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px] sm:[background-size:42px_42px]" /> <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-neon/10 sm:h-[520px] sm:w-[520px]" /> <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-neon/5 sm:h-[720px] sm:w-[720px]" />
</>
);
};
