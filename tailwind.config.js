/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0E0F11', // page base, near-black with a cool cast
        panel: '#141518', // node / surface fill
        surface: '#181A1D', // raised surface
        ink: '#ECECE6', // primary text
        muted: '#9AA0A6', // secondary text
        faint: '#6B7077', // tertiary text
        line: '#26282C', // hairline borders
        lineSoft: '#1E2024', // softer hairline
        accent: '#E8FF52', // signal green-yellow
        signal: '#7EE0D6', // cyan-teal secondary signal
        warn: '#F0B23E', // amber (human approval / pending)
        danger: '#E5564B', // red (edges / failure)
        ok: '#7BD88F', // green (success)
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // fluid display scale, clamp(min, preferred, max)
        'hero': ['clamp(3.2rem, 9vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display': ['clamp(2.6rem, 6vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em', fontWeight: '700' }],
        'statement': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.025em', fontWeight: '600' }],
        'section': ['clamp(1.6rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      maxWidth: {
        content: '1240px',
        prose: '64ch',
      },
      borderRadius: {
        // intentionally low radii: technical, not friendly-blob
        sharp: '0px',
        xs: '2px',
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
      },
      boxShadow: {
        node: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 18px 40px -24px rgba(0,0,0,0.9)',
        panel: '0 24px 60px -30px rgba(0,0,0,0.85)',
        glow: '0 0 0 1px rgba(232,255,82,0.35), 0 0 28px -6px rgba(232,255,82,0.30)',
        inset: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'fade-b': 'linear-gradient(to bottom, transparent, #0E0F11 85%)',
        'fade-r': 'linear-gradient(to right, transparent, #0E0F11 90%)',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
      keyframes: {
        'dash': { to: { strokeDashoffset: '-16' } },
        'pulse-node': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.55' } },
        'rise': { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        dash: 'dash 0.7s linear infinite',
        'pulse-node': 'pulse-node 2.4s ease-in-out infinite',
        rise: 'rise 0.6s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}
