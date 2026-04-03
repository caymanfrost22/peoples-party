'use client'

import { useState } from 'react'

const reasons = [
  { icon: '🏠', text: 'Housing I can actually afford' },
  { icon: '💊', text: 'Healthcare that doesn\'t bankrupt me' },
  { icon: '🎓', text: 'Education without lifelong debt' },
  { icon: '💼', text: 'Wages that keep up with the cost of living' },
  { icon: '🔍', text: 'A government that\'s actually transparent' },
  { icon: '🏭', text: 'Jobs that can\'t be shipped overseas' },
]

export default function JoinPage() {
  const [form, setForm] = useState({ name: '', email: '', zip_code: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
    } catch (err: any) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0a1628' }}>
        <div className="max-w-lg w-full text-center">
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="text-4xl font-black text-white mb-4">You're In!</h1>
          <p className="text-xl mb-6" style={{ color: '#8fa3bc' }}>
            Welcome to The People's Party, {form.name || 'patriot'}. You just joined a movement that puts people over politics.
          </p>
          <div
            className="rounded-2xl p-6 mb-8 text-left"
            style={{ background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.3)' }}
          >
            <h3 className="font-bold text-white mb-3">What happens next:</h3>
            <ul className="space-y-2" style={{ color: '#8fa3bc' }}>
              <li>✅ You'll receive a confirmation email</li>
              <li>📣 We'll keep you updated on our launch campaign</li>
              <li>🗳️ You'll be first to know when we file for ballot access</li>
              <li>📢 Share this with people who feel left behind by both parties</li>
            </ul>
          </div>
          <a
            href="/"
            className="inline-block px-8 py-3 rounded-full font-bold"
            style={{ background: '#f5a623', color: '#0a1628' }}
          >
            Back to Home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: '#0a1628' }}>
      {/* Hero */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #0a1628 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(6,214,160,0.15)', color: '#06d6a0', border: '1px solid rgba(6,214,160,0.3)' }}
          >
            🚀 Join the Movement
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Done waiting for</span>{' '}
            <span style={{ color: '#f5a623' }}>change to happen?</span>
          </h1>
          <p className="text-xl" style={{ color: '#8fa3bc' }}>
            The People's Party isn't backed by billionaires or corporations. It's backed by people like you — who
            believe America deserves better than choosing between two broken options.
          </p>
        </div>
      </section>

      {/* Why people join */}
      <section className="py-12 px-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-white mb-8">People join because they want:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {reasons.map((r) => (
              <div
                key={r.text}
                className="rounded-xl p-4 flex items-center gap-3"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="text-2xl">{r.icon}</span>
                <span className="text-sm font-medium" style={{ color: '#8fa3bc' }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <h2 className="text-2xl font-black text-white mb-2">Sign Up</h2>
            <p className="mb-8" style={{ color: '#8fa3bc' }}>
              No spam. No donation asks. Just updates on the movement.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#8fa3bc' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="First and last name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#8fa3bc' }}>
                  Email Address <span style={{ color: '#c8102e' }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#8fa3bc' }}>
                  ZIP Code
                </label>
                <input
                  type="text"
                  placeholder="Your ZIP code"
                  maxLength={10}
                  value={form.zip_code}
                  onChange={(e) => setForm({ ...form, zip_code: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                />
                <p className="text-xs mt-1" style={{ color: '#8fa3bc' }}>
                  Helps us understand where support is growing
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#8fa3bc' }}>
                  Why are you joining? <span className="font-normal">(optional)</span>
                </label>
                <textarea
                  placeholder="Tell us what brought you here..."
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                />
              </div>

              {status === 'error' && (
                <div
                  className="rounded-xl p-4 text-sm"
                  style={{ background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.3)', color: '#ff6b7a' }}
                >
                  {errorMsg || 'Something went wrong. Please try again.'}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl text-lg font-bold transition-all"
                style={{
                  background: status === 'loading' ? 'rgba(6,214,160,0.5)' : '#06d6a0',
                  color: '#0a1628',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'loading' ? 'Joining...' : 'Join the Movement →'}
              </button>

              <p className="text-center text-xs" style={{ color: '#8fa3bc' }}>
                We never sell or share your information. Ever.
              </p>
            </form>
          </div>

          {/* Credibility note */}
          <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: '#8fa3bc' }}>
              Join thousands of Americans who are done choosing between the lesser of two evils.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
