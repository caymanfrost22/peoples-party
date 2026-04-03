export const revalidate = 3600

const phases = [
  {
    phase: 'Phase 1',
    days: 'Days 1–10',
    title: 'Emergency Transparency Orders',
    color: '#f5a623',
    icon: '🔍',
    actions: [
      {
        day: 1,
        title: 'Full Federal Audit Order',
        description: 'Executive order mandating a top-to-bottom audit of all federal agencies. Every contract, grant, and expenditure over $100K made public within 30 days.',
      },
      {
        day: 2,
        title: 'Lobbying Blackout',
        description: 'Immediate halt on all executive branch meetings with registered lobbyists until audit is complete. No new contracts to firms with active lobbying arms.',
      },
      {
        day: 3,
        title: 'Congressional Stock Trading Ban',
        description: 'Push emergency legislation banning members of Congress and their spouses from trading individual stocks while in office. Introduce the ETHICS Act.',
      },
      {
        day: 5,
        title: 'Open Government Data Portal',
        description: 'Launch a public dashboard at data.gov showing real-time federal spending, agency budgets, and contractor payments — searchable by citizen.',
      },
      {
        day: 7,
        title: 'Revolving Door Freeze',
        description: '5-year ban on senior officials moving from regulatory agencies to the industries they regulated. Extend cooling-off periods across all cabinet departments.',
      },
      {
        day: 10,
        title: 'Price Transparency in Healthcare',
        description: 'Enforce existing hospital price transparency laws with real teeth — $1M/day fines for non-compliance. Require drug price negotiations for all federal programs.',
      },
    ],
  },
  {
    phase: 'Phase 2',
    days: 'Days 11–30',
    title: 'Economic Relief & Tax Reform',
    color: '#00b4d8',
    icon: '💰',
    actions: [
      {
        day: 15,
        title: 'Working Family Tax Credit Expansion',
        description: 'Expand the Earned Income Tax Credit to cover gig workers and self-employed. Remove the marriage penalty. Index to inflation automatically.',
      },
      {
        day: 18,
        title: 'Corporate Minimum Tax Enforcement',
        description: 'Full enforcement of the 15% corporate minimum tax with no loopholes. Close the carried interest loophole. Eliminate offshore tax shelter deductions.',
      },
      {
        day: 22,
        title: 'Student Debt Restructuring Plan',
        description: 'Cap student loan interest at the rate of inflation. Convert all federal loans to income-based repayment automatically. 10-year forgiveness for public service.',
      },
      {
        day: 25,
        title: 'Small Business Fast Lane',
        description: 'Launch a single-portal federal licensing system. Cut permit approval times from 180 days to 30 days. $50B fund for small business loans at 2% interest.',
      },
      {
        day: 28,
        title: 'Housing Emergency Declaration',
        description: 'Declare a national housing affordability emergency. Release 500,000 acres of federal land for affordable housing development. Reform zoning incentive grants.',
      },
    ],
  },
  {
    phase: 'Phase 3',
    days: 'Days 31–60',
    title: 'Healthcare & Education Overhaul',
    color: '#06d6a0',
    icon: '🏥',
    actions: [
      {
        day: 35,
        title: 'Medicare Negotiation Expansion',
        description: 'Extend Medicare drug negotiation powers to cover all top 250 most prescribed drugs immediately. Cap insulin at $35 for all Americans, not just Medicare.',
      },
      {
        day: 40,
        title: 'Community Health Center Funding',
        description: 'Double funding for federally qualified health centers — adding 10M patients to affordable primary care. Expand mental health parity enforcement.',
      },
      {
        day: 45,
        title: 'K–12 Funding Equity Act',
        description: 'Restructure federal education funding so school quality doesn\'t depend on ZIP code. Tie Title I funding to real-cost-of-living adjustments.',
      },
      {
        day: 50,
        title: 'Vocational Training Renaissance',
        description: 'Launch 500 federally-funded trade apprenticeship programs in partnership with community colleges. Free certification for high-demand trades.',
      },
      {
        day: 55,
        title: 'Universal Pre-K Access',
        description: 'Fund full-day Pre-K for all 3–4 year olds through a partnership with states. Require states match federal funds to receive grants.',
      },
    ],
  },
  {
    phase: 'Phase 4',
    days: 'Days 61–80',
    title: 'Government Efficiency & Reform',
    color: '#8b5cf6',
    icon: '⚙️',
    actions: [
      {
        day: 62,
        title: 'Duplicate Agency Elimination',
        description: 'Appoint a non-partisan Commission on Government Efficiency (real one) — identify and merge overlapping agencies. Target 15% reduction in administrative overhead.',
      },
      {
        day: 65,
        title: 'Regulatory Sunset Review',
        description: 'All regulations older than 20 years undergo automatic review and reauthorization. Eliminate rules that have been superseded or are no longer relevant.',
      },
      {
        day: 70,
        title: 'Federal IT Modernization',
        description: '$20B emergency fund to replace legacy government IT systems. Mandate open-source standards for all new federal software. Create a US Digital Service expansion.',
      },
      {
        day: 75,
        title: 'Procurement Reform Act',
        description: 'Break up consolidated government contracts. No single contractor can hold more than 5% of any agency\'s budget. Preference for American small businesses.',
      },
      {
        day: 78,
        title: 'Term Limits Amendment Push',
        description: 'Submit a constitutional amendment to Congress for 12-year term limits in the House and Senate. Launch 38-state ratification campaign.',
      },
    ],
  },
  {
    phase: 'Phase 5',
    days: 'Days 81–100',
    title: 'Foreign Policy & Long-Term Vision',
    color: '#c8102e',
    icon: '🌐',
    actions: [
      {
        day: 82,
        title: 'Alliance Audit',
        description: 'Full review of all 50+ US treaty obligations and alliances. Publish cost-benefit analysis of each. Reform NATO cost-sharing formula to be GDP-proportional.',
      },
      {
        day: 85,
        title: 'Trade Agreement Renegotiation',
        description: 'Announce intent to renegotiate trade agreements that have shipped jobs overseas without enforceable labor protections. Launch "Made in America" industrial policy.',
      },
      {
        day: 88,
        title: 'Foreign Aid Transparency',
        description: 'Require all foreign aid to be project-specific with public outcomes reporting. Redirect aid savings to domestic infrastructure.',
      },
      {
        day: 92,
        title: 'Veterans First Act',
        description: 'Eliminate VA backlog within 2 years — mandatory 30-day claims processing. Launch veteran entrepreneur grants. Mental health funding tripled.',
      },
      {
        day: 98,
        title: 'The People\'s Address',
        description: 'National address to the American people — no teleprompter, no speechwriters. Report on every promise made and every action taken. Launch Year 2 agenda vote on people.gov.',
      },
    ],
  },
]

export default function ReformPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a1628' }}>
      {/* Hero */}
      <section className="py-20 px-4 text-center" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #0a1628 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(245,166,35,0.15)', color: '#f5a623', border: '1px solid rgba(245,166,35,0.3)' }}>
            ⚡ The Action Plan
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight">
            <span style={{ color: '#f5a623' }}>100 Days.</span>{' '}
            <span className="text-white">Real Change.</span>
          </h1>
          <p className="text-xl mb-4" style={{ color: '#8fa3bc' }}>
            Not promises. Not talking points. A day-by-day action plan — specific, measurable, and accountable.
          </p>
          <p className="text-base" style={{ color: '#8fa3bc' }}>
            Every action below is tied to an executive order, legislation, or agency directive. No vague goals.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="py-8 px-4" style={{ background: 'rgba(245,166,35,0.08)', borderTop: '1px solid rgba(245,166,35,0.2)', borderBottom: '1px solid rgba(245,166,35,0.2)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '5', label: 'Reform Phases' },
            { value: '26', label: 'Specific Actions' },
            { value: '100', label: 'Days to Deliver' },
            { value: '0', label: 'Corporate Donors' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-black" style={{ color: '#f5a623' }}>{stat.value}</div>
              <div className="text-sm mt-1" style={{ color: '#8fa3bc' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {phases.map((phase, phaseIdx) => (
            <div key={phase.phase} className="mb-16">
              {/* Phase Header */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: `${phase.color}22`, border: `2px solid ${phase.color}` }}
                >
                  {phase.icon}
                </div>
                <div>
                  <div className="text-sm font-bold mb-1" style={{ color: phase.color }}>
                    {phase.phase} · {phase.days}
                  </div>
                  <h2 className="text-2xl font-black text-white">{phase.title}</h2>
                </div>
              </div>

              {/* Actions */}
              <div className="relative ml-8">
                {/* Vertical line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background: `linear-gradient(to bottom, ${phase.color}, transparent)`, marginLeft: '-1px' }}
                />

                <div className="space-y-6 pl-8">
                  {phase.actions.map((action, actionIdx) => (
                    <div
                      key={action.day}
                      className="relative rounded-2xl p-6"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute w-4 h-4 rounded-full border-2 border-current flex items-center justify-center"
                        style={{
                          left: '-2.25rem',
                          top: '1.5rem',
                          background: '#0a1628',
                          borderColor: phase.color,
                          color: phase.color,
                        }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ background: phase.color }} />
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full"
                          style={{ background: `${phase.color}22`, color: phase.color, border: `1px solid ${phase.color}44` }}
                        >
                          Day {action.day}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{action.title}</h3>
                          <p style={{ color: '#8fa3bc' }} className="leading-relaxed">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 text-center" style={{ background: 'rgba(6,214,160,0.05)', borderTop: '1px solid rgba(6,214,160,0.15)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-6">🗳️</div>
          <h2 className="text-3xl font-black text-white mb-4">
            This Only Works With You
          </h2>
          <p className="text-lg mb-8" style={{ color: '#8fa3bc' }}>
            Every reform on this list has been blocked before — by lobbyists, donors, and career politicians.
            The only force strong enough to push through is a united citizenry.
          </p>
          <a
            href="/join"
            className="inline-block px-10 py-4 rounded-full text-lg font-bold transition-all"
            style={{ background: '#06d6a0', color: '#0a1628' }}
          >
            Join the Movement →
          </a>
        </div>
      </section>
    </main>
  )
}
