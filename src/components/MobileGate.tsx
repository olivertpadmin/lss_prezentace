'use client'

/** Prezentace je navržená pro velké obrazovky — na mobilu zobrazíme vysvětlení. */
export default function MobileGate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 px-8 text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, #1C1016 0%, #0B0810 65%)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(163,50,48,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.12,
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lss/lss-logo-light.png"
            alt="Letní shakespearovské slavnosti"
            style={{ width: 200, height: 'auto', objectFit: 'contain' }}
          />

          <svg width="52" height="52" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <rect x="4" y="8" width="48" height="30" rx="3" stroke="#C8453E" strokeWidth="2.5" />
            <line x1="20" y1="38" x2="18" y2="48" stroke="#C8453E" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="36" y1="38" x2="38" y2="48" stroke="#C8453E" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="15" y1="48" x2="41" y2="48" stroke="#C8453E" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          <div className="flex flex-col gap-2.5">
            <h1
              className="text-2xl leading-tight"
              style={{ fontFamily: "'Panel Sans', sans-serif", color: '#F6F1E8' }}
            >
              Otevřete na počítači
            </h1>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'rgba(246,241,232,0.55)', fontFamily: "'Mulish', sans-serif" }}
            >
              Prezentace pracuje s interaktivním schématem ekosystému a plánky hledišť. Na notebooku
              nebo monitoru z ní uvidíte vše.
            </p>
          </div>

          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: '#C9A227' }}>
            Digitální ekosystém PLG
          </p>
        </div>
      </div>

      <div className="hidden md:block h-full">{children}</div>
    </>
  )
}
