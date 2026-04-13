import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { PlatformPosition } from '@/lib/supabase'

const stats = [
  { num: '$7.42T', label: 'Federal Spending 2026', color: '#c8102e' },
  { num: '$39T', label: 'National Debt', color: '#f5a623' },
  { num: '$1T/yr', label: 'Interest on Debt Alone', color: '#c8102e' },
  { num: '$536B', label: 'Annual Tax Compliance Cost', color: '#00b4d8' },
  { num: '$0', label: 'Income Tax Under Our Plan', color: '#06d6a0' },
  { num: '2.4M', label: 'Words in Tax Code', color: '#f5a623' },
]

const pillars = [
  { icon: '⚖️', title: 'Fairness Over Ideology', desc: 'Every policy judged on one question: does it serve ordinary Americans or those already in power?' },
  { icon: '🔍', title: 'Radical Transparency', desc: 'Every dollar spent, every law passed, every order signed — explained in plain English, publicly.' },
  { icon: '🔧', title: 'Fix What\'s Broken', desc: 'No culture war distractions. Eliminate waste, simplify laws, and make government actually work.' },
  { icon: '🗳️', title: 'Real Democracy', desc: 'Term limits, ranked choice voting, money out of politics. Government that actually represents you.' },
]

export default async function Home() {
  const { data: positions } = await supabase
    .from('platform_positions')
    .select('*')
    .eq('active', true)
    .order('priority', { ascending: false })
    .limit(4)

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden text-center py-24 px-4"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2a44 50%, #0d2137 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[40rem] opacity-[0.015] leading-none">★</span>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: '#f5a623', color: '#0a1628' }}>
            People-First Political Movement · Est. 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Government For<br />
            <span style={{ color: '#f5a623' }}>The People.</span><br />
            By The People.
          </h1>
          <p className="text-lg md:text-xl text-[#8fa3bc] max-w-2xl mx-auto mb-4">
            Breaking the two-party stranglehold. Eliminating waste. Restoring democracy to its founding purpose.
          </p>
          <p className="text-2xl font-bold mb-10" style={{ color: '#00b4d8' }}>
            Not Left. Not Right. Forward.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/join"
              className="px-8 py-3 rounded-full font-bold text-[#0a1628] text-lg transition-all hover:scale-105"
              style={{ background: '#f5a623' }}>
              Join the Movement
            </Link>
            <Link href="/platform"
              className="px-8 py-3 rounded-full font-bold text-lg border transition-all hover:scale-105"
              style={{ borderColor: '#f5a623', color: '#f5a623' }}>
              See Our Platform
            </Link>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="py-8 px-4" style={{ background: '#0d1f38', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map(s => (
            <div key={s.label} className="text-center p-4 rounded-2xl border border-white/5"
              style={{ background: '#1a2a44' }}>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.num}</div>
              <div className="text-xs mt-1" style={{ color: '#8fa3bc' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TAX REFORM HIGHLIGHT */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #0d1f38, #0a1628)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.3)', color: '#06d6a0' }}>
            🔥 Featured Reform
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Abolish the IRS.<br />
            <span style={{ color: '#f5a623' }}>Keep Your Whole Paycheck.</span>
          </h2>
          <p className="text-[#8fa3bc] text-lg max-w-2xl mx-auto mb-8">
            Replace 2.4 million words of tax code with one simple consumption tax.
            The wealthy pay more. The poor are protected. Everyone wins — except the lobbyists.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {['25% Consumption Tax', 'Monthly Prebate', '15% Corporate Rate', 'Abolish the IRS', '$536B Compliance Cost Eliminated'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)', color: '#f5a623' }}>
                {tag}
              </span>
            ))}
          </div>
          <Link href="/issues/taxes"
            className="inline-block px-8 py-3 rounded-full font-bold text-lg transition-all hover:scale-105"
            style={{ background: '#f5a623', color: '#0a1628' }}>
            See the Full Tax Reform Plan →
          </Link>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)', color: '#f5a623' }}>
            ★ Core Identity
          </div>
          <h2 className="text-4xl font-black mb-3">Who We Are</h2>
          <p className="text-[#8fa3bc] max-w-xl mx-auto">
            Not left or right — we cut through political theater and fix what&apos;s actually broken.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(p => (
            <div key={p.title} className="rounded-2xl p-6 text-center transition-all hover:-translate-y-1"
              style={{ background: '#1a2a44', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#f5a623' }}>{p.title}</h3>
              <p className="text-sm" style={{ color: '#8fa3bc' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP POSITIONS PREVIEW */}
      {positions && positions.length > 0 && (
        <section className="py-20 px-4" style={{ background: '#0d1f38' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.3)', color: '#00b4d8' }}>
                📋 Where We Stand
              </div>
              <h2 className="text-4xl font-black mb-3">Our Top Positions</h2>
              <p className="text-[#8fa3bc]">Live from our database — updated as we refine our views.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(positions as PlatformPosition[]).map(pos => (
                <div key={pos.id} className="rounded-2xl p-6 transition-all hover:-translate-y-1"
                  style={{ background: '#1a2a44', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{pos.issue_icon}</span>
                    <h3 className="text-xl font-bold" style={{ color: '#f5a623' }}>{pos.issue}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <span className="shrink-0 font-bold" style={{ color: '#3b82f6' }}>🔵 Dem:</span>
                      <span style={{ color: '#93c5fd' }}>{pos.dem_position}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="shrink-0 font-bold" style={{ color: '#ef4444' }}>🔴 Rep:</span>
                      <span style={{ color: '#fca5a5' }}>{pos.rep_position}</span>
                    </div>
                    <div className="flex gap-2 p-3 rounded-xl" style={{ background: 'rgba(6,214,160,0.08)', border: '1px solid rgba(6,214,160,0.2)' }}>
                      <span className="shrink-0 font-bold" style={{ color: '#06d6a0' }}>🟢 Us:</span>
                      <span className="font-semibold" style={{ color: '#06d6a0' }}>{pos.peoples_position}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/platform"
                className="inline-block px-8 py-3 rounded-full font-bold border transition-all hover:scale-105"
                style={{ borderColor: '#f5a623', color: '#f5a623' }}>
                View Full Platform →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #1a2a44, #0a1628)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Ready to <span style={{ color: '#f5a623' }}>Fix This?</span>
          </h2>
          <p className="text-[#8fa3bc] text-lg mb-8">
            Join thousands of Americans who are done picking between two bad options.
            The People&apos;s Party is building something different.
          </p>
          <Link href="/join"
            className="inline-block px-10 py-4 rounded-full font-black text-xl text-[#0a1628] transition-all hover:scale-105 hover:shadow-2xl"
            style={{ background: '#f5a623' }}>
            Join the Movement 🦅
          </Link>
        </div>
      </section>
    </div>
  )
}
