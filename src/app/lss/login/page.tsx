'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import NightSky from '@/components/lss/NightSky'
import { LSS } from '@/lib/lss'

export default function LssLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/lss-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) router.push('/lss')
    else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <main
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(175deg, #0B0810 0%, #150E18 50%, #1C1016 100%)' }}
    >
      <NightSky variant="full" />

      <div className="relative z-10 flex flex-col items-center gap-7 w-full max-w-sm px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/lss/lss-logo-light.png"
          alt="Letní shakespearovské slavnosti"
          style={{ width: 260, height: 'auto', objectFit: 'contain' }}
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <h1
            className="text-3xl leading-tight"
            style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
          >
            Digitální ekosystém PLG
          </h1>
          <p className="text-xs font-semibold tracking-[0.18em]" style={{ color: 'rgba(246,241,232,0.42)' }}>
            Prezentace připravená pro slavnosti
          </p>
        </div>

        <div style={{ width: '100%', height: 1, background: 'rgba(246,241,232,0.1)' }} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Vložte heslo"
            autoFocus
            className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition"
            style={{
              background: 'rgba(246,241,232,0.07)',
              border: error ? `1px solid ${LSS.crimsonLit}` : '1px solid rgba(246,241,232,0.14)',
              color: LSS.paper,
              fontFamily: "'Mulish', sans-serif",
            }}
            onFocus={(e) => {
              if (!error) e.currentTarget.style.border = `1px solid ${LSS.crimsonLit}`
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(163,50,48,0.22)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = error
                ? `1px solid ${LSS.crimsonLit}`
                : '1px solid rgba(246,241,232,0.14)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          {error && (
            <p className="text-xs text-center" style={{ color: LSS.crimsonLit }}>
              Heslo nesedí. Zkuste to prosím znovu.
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-xl py-3.5 text-sm font-bold transition-all disabled:opacity-40"
            style={{
              background:
                loading || !password
                  ? 'rgba(163,50,48,0.5)'
                  : `linear-gradient(135deg, ${LSS.crimsonLit} 0%, ${LSS.crimson} 100%)`,
              color: LSS.paper,
              letterSpacing: '0.06em',
              boxShadow: loading || !password ? 'none' : '0 4px 20px rgba(163,50,48,0.45)',
            }}
          >
            {loading ? 'Otevírám…' : 'Vstoupit do hlediště'}
          </button>
        </form>

        <p className="text-[10px]" style={{ color: 'rgba(246,241,232,0.22)' }}>
          Powered by PLG ecosystem
        </p>
      </div>
    </main>
  )
}
