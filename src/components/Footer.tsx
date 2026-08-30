import { KIND_META } from './canvas/nodeVisuals'
import type { NodeKind } from '../lib/types'

const COLS = [
  {
    title: 'Product',
    links: [
      { href: '#canvas', label: 'Canvas' },
      { href: '#anatomy', label: 'Anatomy' },
      { href: '#usecases', label: 'Use Cases' },
      { href: '#architecture', label: 'Architecture' },
    ],
  },
  {
    title: 'Concept',
    links: [
      { href: '#problem', label: 'The Problem' },
      { href: '#paradigm', label: 'New Paradigm' },
      { href: '#philosophy', label: 'Philosophy' },
      { href: '#vision', label: 'Vision' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
                <rect width="32" height="32" rx="6" fill="#141518" />
                <circle cx="9" cy="16" r="3" fill="#E8FF52" />
                <circle cx="23" cy="9" r="2.4" fill="#7EE0D6" />
                <circle cx="23" cy="23" r="2.4" fill="#F0B23E" />
                <path d="M11.6 15 L20.6 9.8 M11.6 17 L20.6 22.2" stroke="#ECECE6" strokeWidth="1.4" opacity="0.7" />
              </svg>
              <span className="font-display text-[17px] font-600 tracking-tight text-ink">Filament</span>
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
              A visual workspace for designing, connecting, and running enterprise AI systems.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              Not a chatbot. A platform.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-[14px] text-muted transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* node vocabulary strip */}
        <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6">
          {(Object.keys(KIND_META) as NodeKind[]).map((k) => (
            <span key={k} className="flex items-center gap-1.5 font-mono text-[10.5px] text-faint">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: KIND_META[k].color }} />
              {KIND_META[k].tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Filament. Concept site — no engine required.</p>
          <p>Built as a static, deployable showcase.</p>
        </div>
      </div>
    </footer>
  )
}
