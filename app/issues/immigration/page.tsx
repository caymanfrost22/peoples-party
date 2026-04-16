'use client'
import { useState } from 'react'
import Link from 'next/link'

function SectionLabel({ children, color = '#00b4d8', bg = 'rgba(0,180,216,0.1)', border = 'rgba(0,180,216,0.3)' }: {
  children: React.ReactNode; color?: string; bg?: string; border?: string
}) {
  return (
    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
      style={{ background: bg, border: `1px solid ${border}`, color }}>
      {children}
    </div>
  )
}

function StatCard({ num, label, color }: { num: string; label: string; color: string }) {
  return (
    <div className="text-center p-5 rounded-2xl" style={{ background: '#1a2a44', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="text-3xl font-black mb-1" style={{ color }}>{num}</div>
      <div className="text-xs" style={{ color: '#8fa3bc' }}>{label}</div>
    </div>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden mb-3" style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#1a2a44' }}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm hover:bg-white/5 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <span style={{ color: '#f5a623', fontSize: '1.2rem', lineHeight: 1 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm" style={{ color: '#8fa3bc', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  )
}

const VISA_DATA = [
  { visa: 'H-1B', purpose: 'Specialty occupations (tech, finance, engineering)', cap: '65,000 + 20,000 masters', view: 'Reform', viewColor: '#f5a623', viewBg: 'rgba(245,166,35,0.15)', note: 'Raise wage floor to market rate; strengthen American worker priority; cap body-shop firms' },
  { visa: 'H-2A', purpose: 'Temporary agricultural workers', cap: 'No cap', view: 'Keep', viewColor: '#06d6a0', viewBg: 'rgba(6,214,160,0.15)', note: 'Essential to food production; well-structured with return requirement' },
  { visa: 'H-2B', purpose: 'Temp non-agricultural (hospitality, landscaping)', cap: '66,000 + 64,716 supplemental', view: 'Keep/Review', viewColor: '#00b4d8', viewBg: 'rgba(0,180,216,0.15)', note: 'Cap supplemental at base level; enforce return requirement strictly' },
  { visa: 'L-1', purpose: 'Intracompany transfers (managers, specialists)', cap: 'No cap', view: 'Keep', viewColor: '#06d6a0', viewBg: 'rgba(6,214,160,0.15)', note: 'Tighten "specialized knowledge" definition to prevent abuse' },
  { visa: 'O-1', purpose: 'Extraordinary ability (arts, science, business)', cap: 'No cap', view: 'Keep', viewColor: '#06d6a0', viewBg: 'rgba(6,214,160,0.15)', note: 'High bar; attracts genuine top global talent' },
  { visa: 'TN', purpose: 'USMCA professionals (Canada & Mexico)', cap: 'No cap', view: 'Keep', viewColor: '#06d6a0', viewBg: 'rgba(6,214,160,0.15)', note: 'Trade agreement obligation; practical and well-managed' },
  { visa: 'B-1/B-2', purpose: 'Business visitors / tourists', cap: 'No cap', view: 'Enforce', viewColor: '#c8102e', viewBg: 'rgba(200,16,46,0.15)', note: 'Overstay = #1 source of undocumented residents; biometric exit required' },
]

const PILLARS = [
  {
    num: '01', color: '#c8102e', title: 'Secure the Border — For Real',
    tags: ['Physical Barrier', 'Biometric Exit', 'End Catch-and-Release', 'Raise Asylum Bar'],
    points: [
      'Complete physical and technological barrier at all high-traffic border segments',
      'Full CBP and Border Patrol staffing — eliminate vacancies through pay increases',
      'End catch-and-release: all apprehended border crossers held until hearing or removal',
      'Deploy biometric exit tracking at all major ports — end the visa overstay free pass',
      'Asylum must be claimed at a port of entry, not after illegal crossing',
      'Reform credible fear standard — require corroborating evidence, not just a verbal claim',
    ],
  },
  {
    num: '02', color: '#f5a623', title: 'Merit-Based Legal Immigration — The Canada Model',
    tags: ['Points System', 'English Required', 'Skills Priority', '500K–750K/yr Cap'],
    points: [
      'Replace family chain migration (F-2 thru F-4) with a merit points system',
      'Points for: education, English fluency, work skills, age, job offer, self-sufficiency',
      'Retain immediate relatives (spouses, minor children, parents) — family unity matters',
      'Eliminate the diversity visa lottery — 50,000 visas should go to merit, not chance',
      'Cap total annual legal immigration at 500,000–750,000/year (down from 1M+)',
      'No public benefits for 10 years after entry; enforce affidavit of support strictly',
    ],
  },
  {
    num: '03', color: '#00b4d8', title: 'Work Visa Reform — Protect American Workers',
    tags: ['H-1B Wage Floor', 'E-Verify Mandatory', 'Biometric Exit', 'Employer Sanctions'],
    points: [
      'Retain H-2A (agricultural) — no cap, seasonal, essential to food production',
      'Reform H-1B: raise wage floor to 100th percentile of prevailing wage, not the 17th',
      'Cap H-1B staffing/body-shop firms at 20% of annual quota',
      'Biometric exit: H-1B and H-2B overstays auto-trigger employer sanctions',
      'Mandatory E-Verify for all employers — federal contracts first, then all within 2 years',
      'Expand O-1 (extraordinary ability) — no cap justified for top global talent',
    ],
  },
  {
    num: '04', color: '#06d6a0', title: 'Strengthen Citizenship — Honor the Oath',
    tags: ['5-yr Residency', 'English Test', 'Civics Reform', 'Foreign Passport Renunciation'],
    points: [
      'Maintain 5-year residency requirement, English proficiency, and civics test',
      'Upgrade English requirement to formal standardized assessment',
      'Increase civics test rigor — pass 8 of 10 questions (currently 6 of 10)',
      'End birthright citizenship for children of parents without lawful status (constitutional amendment)',
      'Require new citizens to renounce foreign passports within 2 years of naturalization',
      'Military service path: maintain and expand — those who serve earn citizenship',
    ],
  },
  {
    num: '05', color: '#f5a623', title: 'Undocumented Population — Rule of Law, No Amnesty',
    tags: ['No Blanket Amnesty', 'E-Verify Magnet Removal', 'Criminal Priority', 'Case-by-Case Review'],
    points: [
      'No blanket amnesty — 1986 IRCA amnesty tripled the undocumented population within a decade',
      'Mandatory E-Verify removes the primary economic magnet — if you cannot work, incentive diminishes',
      'Prioritize removal of criminal offenders, gang members, and national security risks',
      'Long-term residents with clean records and US-born children: case-by-case legal review',
      'Employer sanctions: $50,000+ per knowingly hired undocumented worker (up from $16,000)',
      "No federal benefits, driver's licenses, or in-state tuition for undocumented residents",
    ],
  },
]

const COMPARE_ROWS = [
  { issue: 'Selection basis', current: 'Family connection (65% of green cards)', reform: 'Merit points — skills, English, education, self-sufficiency' },
  { issue: 'Annual total', current: '1M+ per year (uncapped family + capped employment)', reform: '500,000–750,000/year with hard caps' },
  { issue: 'Diversity lottery', current: '50,000 random visas, no skill or economic test', reform: 'Eliminated — those visas shift to merit-based applicants' },
  { issue: 'H-1B wage standard', current: '17th percentile prevailing wage', reform: '100th percentile — must pay true market rate' },
  { issue: 'Visa overstays', current: 'No biometric exit; airline manifests only', reform: 'Biometric exit at all major ports; auto employer sanctions' },
  { issue: 'Asylum', current: 'Verbal claim at border; released pending hearing; 3M+ case backlog', reform: 'Port of entry only; evidence required; no release pending hearing' },
  { issue: 'E-Verify', current: 'Voluntary in most states', reform: 'Mandatory for all employers within 2 years' },
  { issue: 'Birthright citizenship', current: 'Any birth on US soil regardless of parental status', reform: 'Requires at least one parent to be citizen or LPR (amendment)' },
  { issue: 'Public benefits', current: 'Access after 5 years LPR in many programs', reform: '10-year bar on all public benefits; stronger affidavit enforcement' },
]

export default function ImmigrationPage() {
  return (
    <div>
      {/* Hero */}
      <div className="py-20 px-4 text-center" style={{ background: 'linear-gradient(135deg, #0a1628, #1a2a44)' }}>
        <SectionLabel color="#00b4d8" bg="rgba(0,180,216,0.1)" border="rgba(0,180,216,0.3)">🛡️ Immigration Reform</SectionLabel>
        <h1 className="text-5xl md:text-6xl font-black mb-4">
          Secure Borders.<br />
          <span style={{ color: '#f5a623' }}>Smart Legal Immigration.</span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-6" style={{ color: '#8fa3bc' }}>
          A merit-based, rule-of-law approach that protects American workers, welcomes those who contribute,
          and enforces the law consistently — for everyone.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {['Secure the Border', 'Merit-Based Selection', 'Protect American Workers', 'Rule of Law', 'No Amnesty'].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(0,180,216,0.15)', border: '1px solid rgba(0,180,216,0.4)', color: '#00b4d8' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Strip */}
      <div className="py-8 px-4" style={{ background: '#0d1f38', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard num="1M+" label="Legal immigrants per year" color="#f5a623" />
          <StatCard num="50K" label="Diversity lottery visas/yr" color="#c8102e" />
          <StatCard num="11–22M" label="Estimated undocumented residents" color="#c8102e" />
          <StatCard num="65K" label="H-1B base cap per year" color="#f5a623" />
          <StatCard num="5 yrs" label="Residency for citizenship" color="#00b4d8" />
          <StatCard num="3M+" label="Pending asylum cases" color="#c8102e" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">

        {/* Current Law */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>📜 Current Law</SectionLabel>
            <h2 className="text-4xl font-black mb-3">The Immigration & Nationality Act</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Title 8, United States Code — the primary statute governing all US immigration since 1952.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: '🏛️', title: 'Statutory Foundation', desc: 'The INA (8 U.S.C. §§ 1101–1537) establishes all visa categories, grounds of admissibility, naturalization, and border enforcement authority.', cite: '8 U.S.C. §§ 1101–1537' },
              { icon: '🏢', title: 'Four Enforcement Agencies', desc: 'DHS (umbrella) → USCIS (benefits & naturalization) → CBP (border & ports) → ICE (interior enforcement & removals). State Dept issues visas overseas.', cite: 'Homeland Security Act of 2002' },
              { icon: '🚫', title: 'Grounds of Inadmissibility', desc: 'Criminal history, health conditions, terrorism, public charge risk, fraud, prior unlawful presence over 1 year, and previous deportation can all bar entry.', cite: '8 U.S.C. § 1182(a)' },
            ].map(item => (
              <div key={item.title} className="p-6 rounded-2xl" style={{ background: '#1a2a44', border: '1px solid rgba(0,180,216,0.2)' }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: '#00b4d8' }}>{item.title}</h3>
                <p className="text-sm mb-3" style={{ color: '#8fa3bc' }}>{item.desc}</p>
                <div className="text-xs font-mono" style={{ color: '#8fa3bc', opacity: 0.7 }}>{item.cite}</div>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-2xl" style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)' }}>
            <p className="text-sm" style={{ color: '#8fa3bc' }}>
              <strong className="text-white">Public Charge Rule (8 U.S.C. § 1182(a)(4)(A)):</strong> Immigrants likely to become dependent on government assistance can be denied. Factors include age, health, income, assets, education, and past receipt of public benefits (SNAP, Medicaid, housing assistance).
            </p>
          </div>
        </section>

        {/* Legal Pathways */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>🚪 Legal Pathways</SectionLabel>
            <h2 className="text-4xl font-black mb-3">How People Enter Legally Today</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Five main channels admit 1M+ people per year. Two of them have serious structural problems.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              {
                icon: '👨‍👩‍👧‍👦', title: 'Family-Based (~65% of green cards)', color: '#f5a623', border: 'rgba(245,166,35,0.3)',
                desc: 'Immediate relatives of US citizens have no annual cap. Four preference tiers (F-1 thru F-4) are capped and include distant relatives.',
                sub: ['F-1: Unmarried adult children of US citizens', 'F-2: Spouses/children of LPRs', 'F-3: Married children of US citizens', 'F-4: Siblings of US citizens'],
                cite: '8 U.S.C. § 1151(b)(2); 8 CFR Part 204',
                warn: '⚠️ F-2 thru F-4 chain migration allows extended family entry with no skills, English, or economic self-sufficiency test.'
              },
              {
                icon: '💼', title: 'Employment-Based (~14% of green cards)', color: '#06d6a0', border: 'rgba(6,214,160,0.3)',
                desc: '~140,000 green cards per year across five preference tiers based on skills and employer sponsorship.',
                sub: ['EB-1: Extraordinary ability / multinational executives', 'EB-2: Advanced degrees / exceptional ability', 'EB-3: Skilled workers and professionals', 'EB-4: Special immigrants (religious, etc.)', 'EB-5: Immigrant investors ($800K–$1.05M min)'],
                cite: '8 U.S.C. § 1153(b); 8 CFR Part 204',
                warn: null
              },
            ].map(item => (
              <div key={item.title} className="p-6 rounded-2xl" style={{ background: '#1a2a44', border: `1px solid ${item.border}` }}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-sm mb-3" style={{ color: '#8fa3bc' }}>{item.desc}</p>
                <ul className="text-sm space-y-1 mb-3">
                  {item.sub.map(s => <li key={s} style={{ color: '#8fa3bc' }}>• {s}</li>)}
                </ul>
                <div className="text-xs font-mono mb-3" style={{ color: '#8fa3bc', opacity: 0.7 }}>{item.cite}</div>
                {item.warn && (
                  <div className="p-3 rounded-xl text-xs" style={{ background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.2)', color: '#fca5a5' }}>
                    {item.warn}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '🎲', title: 'Diversity Visa Lottery', color: '#c8102e', border: 'rgba(200,16,46,0.3)', desc: '50,000 visas per year awarded by random lottery to nationals from countries with historically low immigration rates. No skills, education, or economic test required.', cite: '8 U.S.C. § 1153(c)', warn: '⚠️ Our position: eliminate this. No visa should go to chance — these 50,000 slots should be merit-based.' },
              { icon: '🛡️', title: 'Refugees & Asylum', color: '#00b4d8', border: 'rgba(0,180,216,0.3)', desc: 'Asylum requires a credible fear of persecution based on race, religion, nationality, political opinion, or social group. Standard: "significant possibility" of establishing eligibility.', cite: '8 U.S.C. § 1158; 8 CFR Part 208', warn: '⚠️ 3M+ case backlog. Credible fear standard is easily gamed — a verbal claim suffices at many ports. Reform needed.' },
            ].map(item => (
              <div key={item.title} className="p-6 rounded-2xl" style={{ background: '#1a2a44', border: `1px solid ${item.border}` }}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-sm mb-3" style={{ color: '#8fa3bc' }}>{item.desc}</p>
                <div className="text-xs font-mono mb-3" style={{ color: '#8fa3bc', opacity: 0.7 }}>{item.cite}</div>
                <div className="p-3 rounded-xl text-xs" style={{ background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.2)', color: '#fca5a5' }}>
                  {item.warn}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work Visas */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>💼 Work Visas</SectionLabel>
            <h2 className="text-4xl font-black mb-3">Nonimmigrant Work Visa Programs</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Temporary authorization to work in the US — most require employer sponsorship.</p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="px-5 py-3 hidden md:block" style={{ background: '#0d1f38' }}>
              <div className="grid grid-cols-5 gap-4 text-xs font-bold uppercase tracking-widest" style={{ color: '#8fa3bc' }}>
                <span>Visa</span><span>Purpose</span><span>Annual Cap</span><span>Our View</span><span>Reform Note</span>
              </div>
            </div>
            {VISA_DATA.map((row, i) => (
              <div key={row.visa} className="p-4 md:p-0" style={{ background: i % 2 === 0 ? '#1a2a44' : '#162236', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {/* Mobile */}
                <div className="md:hidden space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-lg" style={{ color: '#f5a623' }}>{row.visa}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: row.viewBg, color: row.viewColor }}>{row.view}</span>
                  </div>
                  <div className="text-sm" style={{ color: '#8fa3bc' }}>{row.purpose}</div>
                  <div className="text-xs" style={{ color: '#8fa3bc', opacity: 0.7 }}>Cap: {row.cap}</div>
                  <div className="text-xs" style={{ color: '#8fa3bc' }}>{row.note}</div>
                </div>
                {/* Desktop */}
                <div className="hidden md:grid grid-cols-5 gap-4 px-5 py-4 text-sm items-start">
                  <span className="font-black" style={{ color: '#f5a623' }}>{row.visa}</span>
                  <span style={{ color: '#8fa3bc' }}>{row.purpose}</span>
                  <span style={{ color: '#8fa3bc' }}>{row.cap}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold self-start" style={{ background: row.viewBg, color: row.viewColor }}>{row.view}</span>
                  <span className="text-xs" style={{ color: '#8fa3bc' }}>{row.note}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-2xl" style={{ background: 'rgba(200,16,46,0.06)', border: '1px solid rgba(200,16,46,0.2)' }}>
            <p className="text-sm" style={{ color: '#8fa3bc' }}>
              <strong className="text-white">The Overstay Problem:</strong> Visa overstays — people who enter legally and never leave — are a major source of the undocumented population. The US has no biometric exit tracking system. CBP relies on airline manifests alone. We need biometric verification at departure for all major ports of entry.
            </p>
          </div>
          <div className="mt-3 p-4 rounded-2xl" style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)' }}>
            <p className="text-sm" style={{ color: '#8fa3bc' }}>
              <strong className="text-white">FY 2026 H-1B Update:</strong> A new weighted selection process (effective FY 2027) prioritizes higher-skilled, higher-paid workers. Prevailing wage protections for H-1B, H-1B1, E-3, EB-2, and EB-3 were strengthened in March 2026.
              <span className="block mt-1 text-xs opacity-70">FR Doc. 2025-23853 (Dec 29, 2025); FR Doc. 2026-06017 (Mar 27, 2026)</span>
            </p>
          </div>
        </section>

        {/* Citizenship */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel color="#06d6a0" bg="rgba(6,214,160,0.1)" border="rgba(6,214,160,0.3)">🇺🇸 Citizenship</SectionLabel>
            <h2 className="text-4xl font-black mb-3">Path to American Citizenship</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Current requirements under 8 U.S.C. §§ 1401–1429 — the naturalization statute.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl" style={{ background: '#1a2a44', border: '1px solid rgba(6,214,160,0.2)' }}>
              <h3 className="font-bold mb-4" style={{ color: '#06d6a0' }}>Standard Naturalization Requirements</h3>
              <div className="space-y-3">
                {[
                  { label: 'Residency', val: '5 years as Lawful Permanent Resident (3 years if married to US citizen)' },
                  { label: 'Physical Presence', val: 'At least 30 of 60 months physically in the US' },
                  { label: 'Continuous Residence', val: 'No single absence over 6 months without prior authorization' },
                  { label: 'Good Moral Character', val: 'No disqualifying criminal history throughout qualifying period' },
                  { label: 'English Proficiency', val: 'Reading, writing, and speaking ability (tested in interview)' },
                  { label: 'Civics Test', val: '100-question bank; must pass 6 of 10 (our proposal: 8 of 10)' },
                  { label: 'Oath of Allegiance', val: 'Formal renunciation of prior allegiances at naturalization ceremony' },
                ].map(item => (
                  <div key={item.label} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: '#06d6a0' }}></div>
                    <div>
                      <span className="font-semibold text-white">{item.label}: </span>
                      <span className="text-sm" style={{ color: '#8fa3bc' }}>{item.val}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs" style={{ color: '#8fa3bc', opacity: 0.7 }}>8 U.S.C. § 1427; Form N-400 ($640 fee)</div>
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl" style={{ background: '#1a2a44', border: '1px solid rgba(200,16,46,0.3)' }}>
                <h3 className="font-bold mb-3" style={{ color: '#c8102e' }}>Birthright Citizenship (14th Amendment)</h3>
                <p className="text-sm mb-3" style={{ color: '#8fa3bc' }}>
                  Under current interpretation, any person born on US soil is automatically a citizen — regardless of their parents&apos; immigration status. This includes children of undocumented immigrants, tourists, and temporary visa holders.
                </p>
                <div className="p-3 rounded-xl text-sm" style={{ background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.2)', color: '#fca5a5' }}>
                  <strong>People&apos;s Party Position:</strong> End birthright citizenship for children born to parents who are neither citizens nor LPRs. This requires a constitutional amendment (2/3 Congress + 3/4 states) — the legitimate, transparent path.
                </div>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: '#1a2a44', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="font-bold mb-3" style={{ color: '#f5a623' }}>Accelerated Paths to Citizenship</h3>
                <div className="space-y-2 text-sm" style={{ color: '#8fa3bc' }}>
                  <div>• <strong className="text-white">Military service (peacetime):</strong> 1 year of active duty qualifies</div>
                  <div>• <strong className="text-white">Military service (hostilities):</strong> No residency period required at all</div>
                  <div>• <strong className="text-white">Children of US citizens:</strong> May acquire citizenship at birth even if born abroad</div>
                </div>
                <div className="mt-4 p-3 rounded-xl text-sm" style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', color: '#f5a623' }}>
                  <strong>People&apos;s Party Position:</strong> Maintain and expand the military service path. Those who defend the country earn citizenship.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Border Security */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel color="#c8102e" bg="rgba(200,16,46,0.1)" border="rgba(200,16,46,0.3)">🚧 Border Security</SectionLabel>
            <h2 className="text-4xl font-black mb-3">Current Border Framework</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Statutory and regulatory authority — and where it has been failing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: '🛃', title: 'CBP — Border Protection', desc: 'All persons seeking admission must undergo inspection under 8 U.S.C. § 1225. Includes biometric screening and inadmissibility review. Operates ports of entry and Border Patrol.', color: '#c8102e', cite: '' },
              { icon: '🚔', title: 'ICE — Interior Enforcement', desc: 'Handles removals, deportation proceedings, worksite enforcement, and criminal alien detention. In 2025, USCIS was also granted warrant authority and arrest power.', color: '#c8102e', cite: 'FR Doc. 2025-16978 (Sept 2025)' },
              { icon: '📝', title: 'Asylum Credible Fear', desc: 'Applicants must show a "significant possibility" of establishing asylum eligibility. Immigration judges review officer determinations de novo.', color: '#f5a623', cite: 'FR Doc. 2024-30500 (Dec 2024)' },
            ].map(item => (
              <div key={item.title} className="p-5 rounded-2xl" style={{ background: '#1a2a44', border: `1px solid ${item.color === '#c8102e' ? 'rgba(200,16,46,0.3)' : 'rgba(245,166,35,0.3)'}` }}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-sm" style={{ color: '#8fa3bc' }}>{item.desc}</p>
                {item.cite && <div className="mt-2 text-xs font-mono" style={{ color: '#8fa3bc', opacity: 0.7 }}>{item.cite}</div>}
              </div>
            ))}
          </div>
          <Accordion title="2025–2026 Enforcement Changes">
            <div className="space-y-3">
              {[
                ['EAD waiting period extended', 'Asylum applicants must now wait 365 days before applying for work authorization (was immediate).', 'FR Doc. 2026-03595'],
                ['Automatic EAD extension eliminated', 'Ended automatic extension of work authorization documents for renewal applicants.', 'FR Doc. 2025-19702'],
                ['Civil penalty enforcement', 'Fines for failure to depart now handled exclusively by DHS, not DOJ Board of Immigration Appeals.', 'FR Doc. 2025-11965'],
                ['USCIS enforcement authority', 'USCIS personnel codified with warrant authority, arrest power, and firearms authorization.', 'FR Doc. 2025-16978'],
              ].map(([title, desc, cite]) => (
                <div key={title} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: '#06d6a0' }}></div>
                  <div>
                    <div className="font-semibold text-white">{title}</div>
                    <div>{desc}</div>
                    <div className="text-xs font-mono mt-0.5" style={{ opacity: 0.6 }}>{cite}</div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        </section>

        {/* 5 Pillars */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>🏛️ Reform Plan</SectionLabel>
            <h2 className="text-4xl font-black mb-3">Five Pillars of Immigration Reform</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Secure borders. Merit-based legal immigration. Consistent rule of law.</p>
          </div>
          <div className="space-y-6">
            {PILLARS.map(pillar => (
              <div key={pillar.num} className="p-6 rounded-2xl" style={{ background: '#1a2a44', border: `1px solid ${pillar.color}30` }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl font-black shrink-0" style={{ color: pillar.color, opacity: 0.3 }}>{pillar.num}</div>
                  <div>
                    <h3 className="text-xl font-black" style={{ color: pillar.color }}>{pillar.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {pillar.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ background: `${pillar.color}20`, border: `1px solid ${pillar.color}40`, color: pillar.color }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pillar.points.map(pt => (
                    <div key={pt} className="flex gap-2 text-sm">
                      <span style={{ color: pillar.color, flexShrink: 0 }}>✓</span>
                      <span style={{ color: '#8fa3bc' }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>⚖️ Side by Side</SectionLabel>
            <h2 className="text-4xl font-black mb-3">Current System vs. Our Reform</h2>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="hidden md:grid grid-cols-3 gap-0 px-5 py-3" style={{ background: '#0d1f38' }}>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f5a623' }}>Issue</div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c8102e' }}>Current System</div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#06d6a0' }}>People&apos;s Party Reform</div>
            </div>
            {COMPARE_ROWS.map((row, i) => (
              <div key={row.issue} className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ background: i % 2 === 0 ? '#1a2a44' : '#162236', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="px-5 py-4 font-bold text-sm text-white">{row.issue}</div>
                <div className="px-5 py-4 text-sm" style={{ color: '#fca5a5' }}>{row.current}</div>
                <div className="px-5 py-4 text-sm font-semibold" style={{ color: '#06d6a0' }}>{row.reform}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>❓ FAQ</SectionLabel>
            <h2 className="text-4xl font-black mb-3">Addressing Common Questions</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Real answers, not talking points.</p>
          </div>
          <Accordion title="Isn't this anti-immigration? The US was built by immigrants.">
            <p>Legal immigration built this country — and we fully support it. The People&apos;s Party proposes <em>more merit-based</em> immigration, not less compassion. We want 500,000–750,000 people per year who are vetted, skilled, English-speaking, and self-sufficient. That&apos;s not anti-immigration. That&apos;s pro-immigrant: don&apos;t bring people here to struggle.</p>
          </Accordion>
          <Accordion title="Why didn't the 1986 amnesty work?">
            <p>The Immigration Reform and Control Act (IRCA) of 1986 legalized ~2.7 million undocumented residents. The promise was: amnesty now, enforcement later. The enforcement never came. Within a decade, the undocumented population tripled because the economic magnet — jobs — was never removed. E-Verify didn&apos;t exist. The lesson: enforcement must come <em>before</em> any legalization, not as a promised afterthought.</p>
          </Accordion>
          <Accordion title="Doesn't the US need immigrants to fill labor shortages?">
            <p>Yes — which is why we keep H-2A (agriculture, no cap), retain O-1 (extraordinary talent), and support EB-1/EB-2 employment categories. The reform targets the chaotic portions of the system: chain migration, the diversity lottery, H-1B abuse, and visa overstays. Labor market needs are best met through legal, merit-based channels — not by tolerating illegal entry.</p>
          </Accordion>
          <Accordion title="Can you actually deport millions of people?">
            <p>Mass deportation of 11–22 million people is logistically and economically impractical. We don&apos;t propose it. We propose: (1) removing criminal offenders first, (2) mandatory E-Verify removes the economic magnet — many will self-deport when they cannot work, (3) case-by-case review for long-term residents with clean records. Enforcement reduces the population naturally over time.</p>
          </Accordion>
          <Accordion title="What about DACA recipients?">
            <p>DACA recipients were brought here as children through no choice of their own. The People&apos;s Party supports a <em>legislative solution</em> — not an executive order that can be reversed — providing legal status (not automatic citizenship) to DACA-eligible individuals with clean records who are in school or working. This is a one-time legislative fix, not a template for future unauthorized arrivals.</p>
          </Accordion>
          <Accordion title="How does the Canada points system work?">
            <p>Canada&apos;s Express Entry awards points for: age, education level, work experience, language ability (English/French), arranged employment, and adaptability. The highest-scoring applicants receive invitations to apply for permanent residence. Australia&apos;s SkillSelect works similarly. Both admit 250,000–500,000 immigrants per year with strong economic outcomes. The US can adapt this model while keeping immediate family unity for citizens.</p>
          </Accordion>
        </section>

        {/* Legal Citations */}
        <section>
          <div className="p-5 rounded-2xl" style={{ background: '#1a2a44', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="font-bold mb-3 text-sm" style={{ color: '#8fa3bc' }}>Legal Citations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs font-mono" style={{ color: '#8fa3bc', opacity: 0.7 }}>
              {[
                'INA (Immigration & Nationality Act) — 8 U.S.C. §§ 1101–1537',
                'Grounds of Inadmissibility — 8 U.S.C. § 1182(a)',
                'Family-Based Immigration — 8 U.S.C. § 1151(b)(2), § 1153(a)',
                'Employment-Based Immigration — 8 U.S.C. § 1153(b)',
                'Diversity Visa — 8 U.S.C. § 1153(c)',
                'Naturalization Requirements — 8 U.S.C. §§ 1427–1429',
                'Border Inspection Authority — 8 U.S.C. § 1225',
                'Asylum — 8 U.S.C. § 1158',
                'H-1B Weighted Selection — FR Doc. 2025-23853 (Dec 29, 2025)',
                'Wage Protection Rule — FR Doc. 2026-06017 (Mar 27, 2026)',
                'EAD Reform — FR Doc. 2026-03595 (Feb 23, 2026)',
                'USCIS Enforcement Authority — FR Doc. 2025-16978 (Sept 5, 2025)',
                'Credible Fear Clarification — FR Doc. 2024-30500 (Dec 27, 2024)',
                'Civil Penalties Rule — FR Doc. 2025-11965 (Jun 27, 2025)',
              ].map(c => <div key={c}>• {c}</div>)}
            </div>
          </div>
        </section>

        {/* Back nav */}
        <div className="text-center pt-4">
          <Link href="/issues"
            className="inline-block px-6 py-2 rounded-full text-sm font-bold border transition-all hover:scale-105"
            style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#8fa3bc' }}>
            ← Back to All Issues
          </Link>
        </div>

      </div>
    </div>
  )
}
