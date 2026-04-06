'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { PlatformPosition, Subscriber } from '@/lib/supabase'

type Tab = 'positions' | 'subscribers'

const CATEGORIES = ['economic', 'governance', 'social', 'foreign', 'environment'] as const
const CATEGORY_COLORS: Record<string, string> = {
  economic: '#f5a623',
  governance: '#00b4d8',
  social: '#06d6a0',
  foreign: '#8b5cf6',
  environment: '#22c55e',
}

function EditPositionModal({
  position,
  onSave,
  onClose,
}: {
  position: PlatformPosition | null
  onSave: (p: Partial<PlatformPosition>) => Promise<void>
  onClose: () => void
}) {
  const isNew = !position?.id
  const [form, setForm] = useState<Partial<PlatformPosition>>(
    position || {
      issue: '',
      issue_icon: '📋',
      category: 'economic',
      dem_position: '',
      rep_position: '',
      peoples_position: '',
      our_detail: '',
      priority: 99,
      active: true,
    }
  )
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onSave(form)
    setSaving(false)
  }

  const field = (label: string, key: keyof PlatformPosition, type: 'text' | 'textarea' | 'number' = 'text') => (
    <div>
      <label className="block text-xs font-semibold mb-1" style={{ color: '#8fa3bc' }}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          rows={3}
          value={(form[key] as string) || ''}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full rounded-lg px-3 py-2 text-sm text-white resize-none outline-none"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        />
      ) : (
        <input
          type={type}
          value={(form[key] as string | number) || ''}
          onChange={(e) => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
          className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        />
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div
        className="w-full max-w-2xl rounded-2xl p-6 overflow-y-auto max-h-[90vh]"
        style={{ background: '#0d2040', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-white">{isNew ? 'New Position' : 'Edit Position'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {field('Issue Title', 'issue')}
          {field('Icon (emoji)', 'issue_icon')}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: '#8fa3bc' }}>Category</label>
            <select
              value={form.category || 'economic'}
              onChange={(e) => setForm({ ...form, category: e.target.value as PlatformPosition['category'] })}
              className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} style={{ background: '#0d2040' }}>{c}</option>
              ))}
            </select>
          </div>
          {field('Priority (lower = first)', 'priority', 'number')}
        </div>

        <div className="space-y-4 mb-4">
          {field('🔵 Democrat Position', 'dem_position', 'textarea')}
          {field('🔴 Republican Position', 'rep_position', 'textarea')}
          {field('🟢 Our Position', 'peoples_position', 'textarea')}
          {field('📄 Our Detailed Explanation', 'our_detail', 'textarea')}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <label className="text-sm font-semibold" style={{ color: '#8fa3bc' }}>Active</label>
          <button
            onClick={() => setForm({ ...form, active: !form.active })}
            className="w-12 h-6 rounded-full transition-all relative"
            style={{ background: form.active ? '#06d6a0' : 'rgba(255,255,255,0.1)' }}
          >
            <div
              className="absolute top-1 w-4 h-4 rounded-full transition-all"
              style={{ left: form.active ? '1.5rem' : '0.25rem', background: 'white' }}
            />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 rounded-xl font-bold transition-all"
            style={{ background: saving ? 'rgba(6,214,160,0.5)' : '#06d6a0', color: '#0a1628' }}
          >
            {saving ? 'Saving...' : isNew ? 'Create Position' : 'Save Changes'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold transition-all"
            style={{ background: 'rgba(255,255,255,0.07)', color: '#8fa3bc' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('positions')
  const [positions, setPositions] = useState<PlatformPosition[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [editTarget, setEditTarget] = useState<PlatformPosition | null | 'new'>()
  const [searchSub, setSearchSub] = useState('')
  const [filterCat, setFilterCat] = useState<string>('all')

  const loadPositions = useCallback(async () => {
    const res = await fetch('/api/admin/positions')
    if (res.status === 401) { router.push('/admin'); return }
    const { data } = await res.json()
    setPositions(data || [])
  }, [router])

  const loadSubscribers = useCallback(async () => {
    const { data } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })
    setSubscribers(data || [])
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.email !== 'caymanfrost22@gmail.com') {
        router.push('/admin')
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await Promise.all([loadPositions(), loadSubscribers()])
      setLoading(false)
    }
    init()
  }, [loadPositions, loadSubscribers])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const handleSavePosition = async (form: Partial<PlatformPosition>) => {
    const method = form.id ? 'PATCH' : 'POST'
    await fetch('/api/admin/positions', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    await loadPositions()
    setEditTarget(undefined)
  }

  const handleDeletePosition = async (id: string) => {
    if (!confirm('Delete this position?')) return
    await fetch(`/api/admin/positions?id=${id}`, { method: 'DELETE' })
    await loadPositions()
  }

  const toggleActive = async (p: PlatformPosition) => {
    await fetch('/api/admin/positions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: p.id, active: !p.active }),
    })
    await loadPositions()
  }

  const filteredPositions = positions.filter(
    (p) => filterCat === 'all' || p.category === filterCat
  )
  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(searchSub.toLowerCase()) ||
      (s.name || '').toLowerCase().includes(searchSub.toLowerCase())
  )

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#0a1628' }}>
        <div className="text-white text-xl">Loading dashboard...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: '#0a1628' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: '#0d2040', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <div className="font-black text-white">Admin Dashboard</div>
            <div className="text-xs" style={{ color: '#8fa3bc' }}>The People's Party</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {(['positions', 'subscribers'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
                style={{
                  background: tab === t ? '#f5a623' : 'transparent',
                  color: tab === t ? '#0a1628' : '#8fa3bc',
                }}
              >
                {t}{' '}
                <span className="opacity-70">
                  ({t === 'positions' ? positions.length : subscribers.length})
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: 'rgba(200,16,46,0.15)', color: '#ff6b7a', border: '1px solid rgba(200,16,46,0.3)' }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* ─── POSITIONS TAB ─── */}
        {tab === 'positions' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-white">Platform Positions</h2>
              <div className="flex gap-3">
                <select
                  value={filterCat}
                  onChange={(e) => setFilterCat(e.target.value)}
                  className="rounded-lg px-3 py-2 text-sm text-white outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <option value="all" style={{ background: '#0d2040' }}>All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} style={{ background: '#0d2040' }}>{c}</option>
                  ))}
                </select>
                <button
                  onClick={() => setEditTarget('new')}
                  className="px-4 py-2 rounded-lg text-sm font-bold"
                  style={{ background: '#06d6a0', color: '#0a1628' }}
                >
                  + New Position
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredPositions.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl p-5 flex items-start gap-4"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${p.active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}`,
                    opacity: p.active ? 1 : 0.5,
                  }}
                >
                  <div className="text-3xl">{p.issue_icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-white">{p.issue}</h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: `${CATEGORY_COLORS[p.category]}22`,
                          color: CATEGORY_COLORS[p.category],
                        }}
                      >
                        {p.category}
                      </span>
                      <span className="text-xs" style={{ color: '#8fa3bc' }}>Priority: {p.priority}</span>
                    </div>
                    <p className="text-sm truncate" style={{ color: '#8fa3bc' }}>
                      🟢 {p.peoples_position}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleActive(p)}
                      className="text-xs px-3 py-1 rounded-lg transition-all"
                      style={{
                        background: p.active ? 'rgba(6,214,160,0.15)' : 'rgba(255,255,255,0.05)',
                        color: p.active ? '#06d6a0' : '#8fa3bc',
                        border: `1px solid ${p.active ? 'rgba(6,214,160,0.3)' : 'rgba(255,255,255,0.1)'}`,
                      }}
                    >
                      {p.active ? 'Live' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => setEditTarget(p)}
                      className="text-xs px-3 py-1 rounded-lg"
                      style={{ background: 'rgba(245,166,35,0.15)', color: '#f5a623', border: '1px solid rgba(245,166,35,0.3)' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePosition(p.id)}
                      className="text-xs px-3 py-1 rounded-lg"
                      style={{ background: 'rgba(200,16,46,0.1)', color: '#ff6b7a', border: '1px solid rgba(200,16,46,0.2)' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── SUBSCRIBERS TAB ─── */}
        {tab === 'subscribers' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-white">
                Subscribers{' '}
                <span style={{ color: '#06d6a0' }}>({subscribers.length})</span>
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchSub}
                  onChange={(e) => setSearchSub(e.target.value)}
                  className="rounded-lg px-4 py-2 text-sm text-white outline-none w-64"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                />
                <button
                  onClick={() => {
                    const csv = [
                      'Name,Email,ZIP,Message,Joined',
                      ...subscribers.map((s) =>
                        `"${s.name || ''}","${s.email}","${s.zip_code || ''}","${(s.message || '').replace(/"/g, '""')}","${s.created_at}"`
                      ),
                    ].join('\n')
                    const blob = new Blob([csv], { type: 'text/csv' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`
                    a.click()
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-bold"
                  style={{ background: '#00b4d8', color: '#0a1628' }}
                >
                  Export CSV
                </button>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total Supporters', value: subscribers.length, color: '#06d6a0' },
                {
                  label: 'This Month',
                  value: subscribers.filter(
                    (s) => new Date(s.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length,
                  color: '#f5a623',
                },
                {
                  label: 'With Message',
                  value: subscribers.filter((s) => s.message).length,
                  color: '#00b4d8',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-5 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-sm mt-1" style={{ color: '#8fa3bc' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {filteredSubscribers.map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl p-4 flex items-start gap-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{ background: 'rgba(6,214,160,0.15)', color: '#06d6a0' }}
                  >
                    {(s.name || s.email)[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white">{s.name || 'Anonymous'}</span>
                      <span style={{ color: '#8fa3bc' }} className="text-sm">{s.email}</span>
                      {s.zip_code && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,180,216,0.1)', color: '#00b4d8' }}>
                          📍 {s.zip_code}
                        </span>
                      )}
                    </div>
                    {s.message && (
                      <p className="text-sm mt-1 italic" style={{ color: '#8fa3bc' }}>"{s.message}"</p>
                    )}
                  </div>
                  <div className="text-xs flex-shrink-0" style={{ color: '#8fa3bc' }}>
                    {new Date(s.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {filteredSubscribers.length === 0 && (
                <div className="text-center py-16" style={{ color: '#8fa3bc' }}>
                  {searchSub ? 'No results for your search.' : 'No subscribers yet — share the site!'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editTarget !== undefined && (
        <EditPositionModal
          position={editTarget === 'new' ? null : editTarget}
          onSave={handleSavePosition}
          onClose={() => setEditTarget(undefined)}
        />
      )}
    </main>
  )
}
