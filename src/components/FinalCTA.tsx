import { Reveal } from './ui/primitives'

export function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="canvas-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          background: 'radial-gradient(50% 60% at 50% 40%, rgba(232,255,82,0.9), transparent 70%)',
        }}
        aria-hidden
      />
      <div className="container-page relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl font-display text-display text-balance text-ink">
            BUILD YOUR <span className="text-accent">AI SYSTEM</span>
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-[17px] leading-relaxed text-muted">
            Stop prompting. Start composing. Explore the platform, or follow the build on
            GitHub.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#canvas" className="btn-primary w-full sm:w-auto">
              Explore the Platform
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full sm:w-auto"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
