import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#canvas', label: 'Canvas' },
  { href: '#problem', label: 'Problem' },
  { href: '#paradigm', label: 'New Paradigm' },
  { href: '#anatomy', label: 'Anatomy' },
  { href: '#usecases', label: 'Use Cases' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#vision', label: 'Vision' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-200',
        scrolled ? 'border-b border-line bg-canvas/85 backdrop-blur-md' : 'border-b border-transparent',
      ].join(' ')}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Filament home">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
            <rect width="32" height="32" rx="6" fill="#141518" />
            <circle cx="9" cy="16" r="3" fill="#E8FF52" />
            <circle cx="23" cy="9" r="2.4" fill="#7EE0D6" />
            <circle cx="23" cy="23" r="2.4" fill="#F0B23E" />
            <path d="M11.6 15 L20.6 9.8 M11.6 17 L20.6 22.2" stroke="#ECECE6" strokeWidth="1.4" opacity="0.7" />
          </svg>
          <span className="font-display text-[17px] font-600 tracking-tight text-ink">Filament</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13.5px] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#cta" className="hidden btn-primary !py-2 !px-4 text-[13px] sm:inline-flex">
            Build your system
          </a>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M3 3l10 10M13 3L3 13" /> : <path d="M2 4h12M2 8h12M2 12h12" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-canvas md:hidden">
          <div className="container-page flex flex-col py-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-sm text-muted last:border-0 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <a href="#cta" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
              Build your system
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
