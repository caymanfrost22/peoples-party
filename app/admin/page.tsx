'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      setStatus('error')
      setPassword('')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0a1628' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-2xl font-black text-white">Admin Portal</h1>
          <p className="mt-2 text-sm" style={{ color: '#8fa3bc' }}>The People's Party — Internal Access</p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#8fa3bc' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
                className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
            </div>

            {status === 'error' && (
              <div
                className="rounded-xl p-3 text-sm text-center"
                style={{ background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.3)', color: '#ff6b7a' }}
              >
                Invalid password. Try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 rounded-xl font-bold transition-all"
              style={{
                background: status === 'loading' ? 'rgba(245,166,35,0.5)' : '#f5a623',
                color: '#0a1628',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              }}
            >
              {status === 'loading' ? 'Verifying...' : 'Enter'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: '#8fa3bc' }}>
          <a href="/" style={{ color: '#f5a623' }}>← Back to site</a>
        </p>
      </div>
    </main>
  )
}
