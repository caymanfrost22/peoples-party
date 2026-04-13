'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/platform', label: 'Platform' },
  { href: '/issues', label: 'Issues' },
  { href: '/issues/taxes', label: 'Tax Reform' },
  { href: '/reform', label: 'Reform Plan' },
  { href: '/join', label: 'Join Us' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-[#f5a623]/30"
      style={{ background: 'rgba(10,22,40,0.97)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-lg">
          <span className="text-2xl">🦅</span>
          <span style={{ color: '#f5a623' }}>The People&apos;s Party</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all
                ${pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href + '/'))
                  ? 'text-[#f5a623] border border-[#f5a623]/40 bg-[#f5a623]/10'
                  : 'text-[#8fa3bc] hover:text-[#f5a623]'}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/join"
            className="ml-3 px-5 py-2 rounded-full text-sm font-bold text-[#0a1628] bg-[#f5a623] hover:bg-[#ffd166] transition-colors">
            Join the Movement
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[#8fa3bc] hover:text-[#f5a623]" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-2"
          style={{ background: '#0d1f38' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold
                ${pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href + '/')) ? 'text-[#f5a623] bg-[#f5a623]/10' : 'text-[#8fa3bc]'}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/join" onClick={() => setOpen(false)}
            className="mt-2 px-5 py-2 rounded-full text-sm font-bold text-[#0a1628] bg-[#f5a623] text-center">
            Join the Movement
          </Link>
        </div>
      )}
    </nav>
  )
}
