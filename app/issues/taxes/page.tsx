'use client'
import { useState } from 'react'
import Link from 'next/link'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
      style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.3)', color: '#00b4d8' }}>
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

function TaxCalculator() {
  const [income, setIncome] = useState(80000)
  const [spending, setSpending] = useState(65000)
  const [household, setHousehold] = useState(4)
  const [stateRate, setStateRate] = useState(3)

  function calcFederalIncomeTax(inc: number): number {
    const brackets: [number, number][] = [
      [11600, 0.10],
      [47150, 0.12],
      [100525, 0.22],
      [191950, 0.24],
      [243725, 0.32],
      [609350, 0.35],
      [Infinity, 0.37],
    ]
    let tax = 0
    let prev = 0
    for (const [ceiling, rate] of brackets) {
      if (inc <= prev) break
      const taxable = Math.min(inc, ceiling) - prev
      tax += taxable * rate
      prev = ceiling
    }
    return Math.round(tax)
  }

  function calcFICA(inc: number): number {
    return Math.round(Math.min(inc, 168600) * 0.0765)
  }

  function povertyLevel(size: number): number {
    return 15060 + (size - 1) * 5380
  }

  const TAX_RATE = 0.23
  const annualPrebate = Math.round(povertyLevel(household) * TAX_RATE)
  const monthlyPrebate = Math.round(annualPrebate / 12)

  const actualSpending = Math.min(spending, income)
  const currentFederalIncome = calcFederalIncomeTax(income)
  const currentFICA = calcFICA(income)
  const currentStateTax = Math.round(income * (stateRate / 100))
  const totalCurrent = currentFederalIncome + currentFICA + currentStateTax

  const grossSalesTax = Math.round(actualSpending * TAX_RATE)
  const netSalesTax = Math.max(0, grossSalesTax - annualPrebate)
  const totalProposed = netSalesTax + currentStateTax

  const savings = totalCurrent - totalProposed
  const effectiveCurrent = ((totalCurrent / income) * 100).toFixed(1)
  const effectiveProposed = ((totalProposed / income) * 100).toFixed(1)

  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ background: '#1a2a44', border: '1px solid rgba(245,166,35,0.2)' }}>
      <h3 className="text-xl font-black mb-6" style={{ color: '#f5a623' }}>Your Tax Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#8fa3bc' }}>Annual Income</label>
          <input
            type="range" min={20000} max={500000} step={5000}
            value={income}
            onChange={e => setIncome(Number(e.target.value))}
            className="w-full mb-1 accent-yellow-400"
          />
          <div className="text-2xl font-black" style={{ color: '#f5a623' }}>${income.toLocaleString()}</div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#8fa3bc' }}>Annual Spending</label>
          <input
            type="range" min={15000} max={Math.min(income, 300000)} step={5000}
            value={actualSpending}
            onChange={e => setSpending(Number(e.target.value))}
            className="w-full mb-1 accent-yellow-400"
          />
          <div className="text-2xl font-black" style={{ color: '#00b4d8' }}>${actualSpending.toLocaleString()}</div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#8fa3bc' }}>Household Size</label>
          <div className="flex gap-2">
            {[1,2,3,4,5,6].map(n => (
              <button key={n}
                onClick={() => setHousehold(n)}
                className="w-10 h-10 rounded-full font-bold text-sm transition-all"
                style={household === n
                  ? { background: '#f5a623', color: '#0a1628' }
                  : { background: '#0d1f38', color: '#8fa3bc', border: '1px solid rgba(255,255,255,0.1)' }}
              >{n}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#8fa3bc' }}>State Income Tax Rate</label>
          <input
            type="range" min={0} max={13} step={0.5}
            value={stateRate}
            onChange={e => setStateRate(Number(e.target.value))}
            className="w-full mb-1 accent-yellow-400"
          />
          <div className="text-2xl font-black" style={{ color: '#8fa3bc' }}>{stateRate}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl" style={{ background: '#0d1f38', border: '1px solid rgba(200,16,46,0.3)' }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#c8102e' }}>Current System</div>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span style={{ color: '#8fa3bc' }}>Federal Income Tax</span>
              <span className="font-bold text-white">${currentFederalIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#8fa3bc' }}>FICA (Payroll)</span>
              <span className="font-bold text-white">${currentFICA.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#8fa3bc' }}>State Income Tax</span>
              <span className="font-bold text-white">${currentStateTax.toLocaleString()}</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between">
              <span className="font-bold">Total Tax Burden</span>
              <span className="font-black" style={{ color: '#c8102e' }}>${totalCurrent.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-2xl font-black" style={{ color: '#c8102e' }}>{effectiveCurrent}% effective rate</div>
        </div>

        <div className="p-5 rounded-2xl" style={{ background: '#0d1f38', border: '1px solid rgba(6,214,160,0.3)' }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#06d6a0' }}>People&apos;s Party Plan</div>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span style={{ color: '#8fa3bc' }}>Federal Income Tax</span>
              <span className="font-bold" style={{ color: '#06d6a0' }}>$0</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#8fa3bc' }}>FICA (Payroll)</span>
              <span className="font-bold" style={{ color: '#06d6a0' }}>$0</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#8fa3bc' }}>23% Consumption Tax</span>
              <span className="font-bold text-white">${grossSalesTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#8fa3bc' }}>Monthly Prebate (×12)</span>
              <span className="font-bold" style={{ color: '#06d6a0' }}>−${annualPrebate.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#8fa3bc' }}>State Income Tax</span>
              <span className="font-bold text-white">${currentStateTax.toLocaleString()}</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between">
              <span className="font-bold">Total Tax Burden</span>
              <span className="font-black" style={{ color: '#06d6a0' }}>${totalProposed.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-2xl font-black" style={{ color: '#06d6a0' }}>{effectiveProposed}% effective rate</div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-2xl text-center" style={{
        background: savings >= 0 ? 'rgba(6,214,160,0.08)' : 'rgba(200,16,46,0.08)',
        border: `1px solid ${savings >= 0 ? 'rgba(6,214,160,0.3)' : 'rgba(200,16,46,0.3)'}`
      }}>
        <div className="text-sm mb-1" style={{ color: '#8fa3bc' }}>Your annual {savings >= 0 ? 'savings' : 'extra cost'} under our plan</div>
        <div className="text-4xl font-black" style={{ color: savings >= 0 ? '#06d6a0' : '#c8102e' }}>
          {savings >= 0 ? '+' : ''}${Math.abs(savings).toLocaleString()}
        </div>
        <div className="text-xs mt-1" style={{ color: '#8fa3bc' }}>Monthly prebate: ${monthlyPrebate}/mo for household of {household}</div>
      </div>
    </div>
  )
}

export default function TaxReformPage() {
  return (
    <div>
      {/* Hero */}
      <div className="py-20 px-4 text-center" style={{ background: 'linear-gradient(135deg, #0a1628, #1a2a44)' }}>
        <SectionLabel>💰 Fiscal Reform</SectionLabel>
        <h1 className="text-5xl md:text-6xl font-black mb-4">
          The Simple Tax Act
        </h1>
        <p className="text-xl text-[#8fa3bc] max-w-2xl mx-auto mb-6">
          Abolish the IRS. Replace 2.4 million words of tax code with one simple rule.
          Keep 100% of your paycheck — pay when you spend.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {['No Income Tax', 'No Payroll Tax', '23% Consumption Tax', 'Monthly Prebate', '15% Corporate Rate'].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.4)', color: '#f5a623' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Strip */}
      <div className="py-8 px-4" style={{ background: '#0d1f38', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard num="$39T" label="National Debt" color="#c8102e" />
          <StatCard num="$1T/yr" label="Interest on Debt" color="#c8102e" />
          <StatCard num="$536B" label="Annual Compliance Cost" color="#f5a623" />
          <StatCard num="2.4M" label="Words in Tax Code" color="#f5a623" />
          <StatCard num="7.1B" label="Hours Lost to Filing" color="#00b4d8" />
          <StatCard num="$0" label="Income Tax Under Our Plan" color="#06d6a0" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">

        {/* The Problem */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>⚠️ The Problem</SectionLabel>
            <h2 className="text-4xl font-black mb-3">You Are Taxed at Every Step</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Earn it, save it, spend it, own it, invest it, die with it — the government takes a cut every time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { step: '💼 Earn It', tax: 'Income Tax + Payroll Tax', rate: '12–37% + 7.65%', color: '#c8102e' },
              { step: '📈 Invest It', tax: 'Capital Gains Tax', rate: '15–23.8%', color: '#c8102e' },
              { step: '🛒 Spend It', tax: 'Sales Tax', rate: '3–10% (state)', color: '#f5a623' },
              { step: '🏠 Own It', tax: 'Property Tax', rate: '1–3%/year', color: '#f5a623' },
              { step: '⛽ Drive It', tax: 'Gas & Excise Tax', rate: '$0.18/gal federal', color: '#f5a623' },
              { step: '💀 Leave It', tax: 'Estate Tax', rate: '40% over $13.6M', color: '#c8102e' },
            ].map(item => (
              <div key={item.step} className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background: '#1a2a44', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-3xl">{item.step.split(' ')[0]}</div>
                <div>
                  <div className="font-bold">{item.step.slice(3)}</div>
                  <div className="text-sm" style={{ color: '#8fa3bc' }}>{item.tax}</div>
                </div>
                <div className="ml-auto font-black text-sm" style={{ color: item.color }}>{item.rate}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-2xl text-center" style={{ background: 'rgba(200,16,46,0.06)', border: '1px solid rgba(200,16,46,0.2)' }}>
            <p className="text-sm" style={{ color: '#8fa3bc' }}>
              The average middle-class household loses <strong className="text-white">30–45%</strong> of income across all taxes.
              High earners and business owners can hit <strong className="text-white">50–65%</strong>.
              The compliance burden alone costs the economy <strong className="text-white">$536 billion every year</strong> — money that builds nothing.
            </p>
          </div>
        </section>

        {/* The Simple Tax Act */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>📜 The Solution</SectionLabel>
            <h2 className="text-4xl font-black mb-3">The Simple Tax Act</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Three rules. One page. Anyone can understand it.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { num: '01', title: 'Abolish the Income Tax', desc: 'Eliminate federal income tax, payroll tax, estate tax, and capital gains tax. Repeal the 16th Amendment. Keep 100% of your paycheck.', color: '#06d6a0' },
              { num: '02', title: '23% Consumption Tax', desc: 'A single federal sales tax on new goods and services. You control how much you pay — spend more, pay more. Save and invest? Pay nothing.', color: '#f5a623' },
              { num: '03', title: 'The Monthly Prebate', desc: 'Every household gets a monthly check covering the tax on poverty-level spending. No one pays federal tax on necessities.', color: '#00b4d8' },
            ].map(item => (
              <div key={item.num} className="p-6 rounded-2xl text-center" style={{ background: '#1a2a44', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-5xl font-black mb-3" style={{ color: item.color, opacity: 0.3 }}>{item.num}</div>
                <h3 className="text-lg font-black mb-2" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-sm" style={{ color: '#8fa3bc' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Prebate Table */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="px-5 py-3" style={{ background: '#0d1f38' }}>
              <h3 className="font-bold text-sm" style={{ color: '#00b4d8' }}>Effective Tax Rates After Prebate — The Tax Becomes Progressive</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ background: '#0d1f38', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th className="text-left p-4 text-xs font-bold" style={{ color: '#8fa3bc' }}>Annual Spending</th>
                  <th className="text-center p-4 text-xs font-bold" style={{ color: '#8fa3bc' }}>Gross Tax (23%)</th>
                  <th className="text-center p-4 text-xs font-bold" style={{ color: '#8fa3bc' }}>Prebate (Family 4)</th>
                  <th className="text-center p-4 text-xs font-bold" style={{ color: '#06d6a0' }}>Effective Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['$31,200 (poverty)', '$7,176', '$7,176', '0%'],
                  ['$50,000', '$11,500', '$7,176', '8.6%'],
                  ['$80,000', '$18,400', '$7,176', '14.0%'],
                  ['$150,000', '$34,500', '$7,176', '18.2%'],
                  ['$300,000', '$69,000', '$7,176', '20.6%'],
                  ['$1,000,000', '$230,000', '$7,176', '22.3%'],
                ].map(([spend, gross, prebate, rate], i) => (
                  <tr key={spend} style={{ background: i % 2 === 0 ? '#1a2a44' : '#162236', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <td className="p-4 text-sm font-semibold">{spend}</td>
                    <td className="p-4 text-sm text-center" style={{ color: '#8fa3bc' }}>{gross}</td>
                    <td className="p-4 text-sm text-center" style={{ color: '#06d6a0' }}>−{prebate}</td>
                    <td className="p-4 text-sm text-center font-black" style={{ color: '#f5a623' }}>{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Calculator */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>🧮 Calculator</SectionLabel>
            <h2 className="text-4xl font-black mb-3">See Your Personal Numbers</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Adjust the sliders to see exactly what you pay today versus under our plan.</p>
          </div>
          <TaxCalculator />
        </section>

        {/* National Debt */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>💸 National Debt</SectionLabel>
            <h2 className="text-4xl font-black mb-3">The $39 Trillion Problem</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">We spend $1 trillion a year just on interest. That builds nothing, helps no one.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard num="$39T" label="Total National Debt" color="#c8102e" />
            <StatCard num="$289K" label="Per Household" color="#c8102e" />
            <StatCard num="127%" label="Debt-to-GDP Ratio" color="#f5a623" />
          </div>
          <div className="space-y-3">
            <Accordion title="How Do We Pay It Down?">
              <div className="space-y-3">
                {[
                  ['Cut Waste & Fraud', '$100–200B/yr', 'GAO identifies $233–521B stolen annually. Aggressive fraud reduction pays dividends.'],
                  ['Full Ally Cost Recovery', '$30–50B/yr', 'Japan, Germany, South Korea — we pay billions to defend them. They pay partial costs. We want full reimbursement.'],
                  ['Restructure Foreign Aid', '$20–30B/yr', 'Convert grants to low-interest loans where appropriate. Tie aid to trade agreements that benefit Americans.'],
                  ['Strategic Tariffs', '$200–400B/yr', 'Revenue from protecting domestic industry. Currently projected at $340B/yr under existing policy.'],
                  ['Federal Asset Sales', '$50B/yr avg', 'We own 640 million acres. Sell underused assets over time. One-time revenue of $500B–$1T+ over 10 years.'],
                ].map(([name, amount, desc]) => (
                  <div key={name} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: '#f5a623' }}></div>
                    <div>
                      <div className="font-bold text-white">{name} — <span style={{ color: '#06d6a0' }}>{amount}</span></div>
                      <div>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
            <Accordion title="Why Not Just Eliminate It?">
              <p>US Treasury bonds are the backbone of global finance — the &quot;risk-free&quot; benchmark everything else prices off of. Paying it off too fast could flood the economy with cash and trigger inflation. Andrew Jackson paid off the debt in 1835 and contributed to the Panic of 1837.</p>
              <p className="mt-3">Our target: <strong className="text-white">debt-to-GDP under 50%</strong> over 20–30 years. That cuts interest payments by more than half, restores fiscal credibility, and still maintains Treasury market stability.</p>
            </Accordion>
            <Accordion title="Countries That Have Done This">
              <table className="w-full text-xs mt-2">
                <thead><tr style={{ color: '#f5a623' }}><th className="text-left pb-2">Country</th><th className="text-left pb-2">Peak Debt/GDP</th><th className="text-left pb-2">Reduced To</th><th className="text-left pb-2">How</th></tr></thead>
                <tbody>
                  {[['UK (post-WWII)', '270%', '~40%', '50 years of growth outpacing debt'], ['Canada (1990s)', '100%', '30%', 'Spending cuts + growth (15 years)'], ['New Zealand', '65%', '20%', 'Fiscal discipline + asset sales'], ['Sweden', '73%', '37%', 'Pension reform + spending cuts']].map(([c, p, r, h]) => (
                    <tr key={c} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <td className="py-1.5">{c}</td><td>{p}</td><td style={{ color: '#06d6a0' }}>{r}</td><td>{h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Accordion>
          </div>
        </section>

        {/* Social Security */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>🏦 Social Security</SectionLabel>
            <h2 className="text-4xl font-black mb-3">Fix Retirement Before It Breaks</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">The SS Trust Fund depletes by 2033. Benefits cut to 75–80% unless we act. Our plan: a hybrid that guarantees a floor while letting your money actually grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Guaranteed Floor', icon: '🛡️', desc: 'No one falls below poverty. Government-guaranteed minimum benefit regardless of market performance.', color: '#06d6a0' },
              { title: 'Personal Accounts', icon: '📈', desc: '5% of contributions go to individual investment accounts — TSP-style options: conservative, moderate, aggressive.', color: '#f5a623' },
              { title: 'No Change for Current Retirees', icon: '✅', desc: 'Anyone within 10 years of retirement: zero changes. The hybrid is for younger workers building their future.', color: '#00b4d8' },
            ].map(item => (
              <div key={item.title} className="p-6 rounded-2xl text-center" style={{ background: '#1a2a44', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-sm" style={{ color: '#8fa3bc' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-2xl" style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)' }}>
            <p className="text-sm" style={{ color: '#8fa3bc' }}>
              <strong className="text-white">Why not full privatization?</strong> Chile tried it in 1981. Projected that under 10% of retirees would need government assistance. The real number: over 40%. They&apos;re reversing course now.
              The hybrid model captures investment upside while protecting everyone with a guaranteed minimum. The TSP model already works for federal employees — avg returns of 7–10%/yr vs Social Security&apos;s implicit 1.5–2%.
            </p>
          </div>
        </section>

        {/* Corporate Tax */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>🏭 Corporate Tax</SectionLabel>
            <h2 className="text-4xl font-black mb-3">15% Flat. No Loopholes.</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Make it cheaper to build here than to ship jobs overseas.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="px-5 py-3" style={{ background: '#0d1f38' }}>
                <h3 className="font-bold text-sm" style={{ color: '#f5a623' }}>Global Corporate Rates</h3>
              </div>
              <table className="w-full">
                <tbody>
                  {[
                    ['🇮🇪 Ireland', '15%', false],
                    ['🇸🇬 Singapore', '17%', false],
                    ['🇨🇦 Canada', '15% federal', false],
                    ['🇺🇸 US (current)', '21%', true],
                    ['🇺🇸 Our Plan', '15% flat', true],
                    ['🇬🇧 UK', '25%', false],
                    ['🇩🇪 Germany', '~30%', false],
                    ['🇨🇳 China', '25%', false],
                  ].map(([country, rate, highlight], i) => (
                    <tr key={country as string}
                      style={{ background: highlight ? 'rgba(245,166,35,0.06)' : i % 2 === 0 ? '#1a2a44' : '#162236', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="p-3 text-sm">{country as string}</td>
                      <td className="p-3 text-sm text-right font-bold" style={{ color: highlight ? '#f5a623' : '#8fa3bc' }}>{rate as string}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4">
              {[
                { title: '15% Flat Rate', desc: 'Matches OECD minimum. Globally competitive. No special rates for campaign donors.', icon: '✂️' },
                { title: 'Territorial System', desc: 'Only tax profits earned in the US. Stop taxing American companies for competing globally.', icon: '🗺️' },
                { title: 'Domestic Investment Credits', desc: 'Build a factory here? Hire Americans? Tax breaks. Ship jobs overseas? Pay extra.', icon: '🏗️' },
                { title: 'Small Business Rate', desc: '10% on first $100K profit. The backbone of the economy deserves a break.', icon: '🏪' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-4 rounded-2xl" style={{ background: '#1a2a44', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <div className="font-bold mb-1" style={{ color: '#f5a623' }}>{item.title}</div>
                    <div className="text-sm" style={{ color: '#8fa3bc' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>📅 Implementation</SectionLabel>
            <h2 className="text-4xl font-black mb-3">The Transition Plan</h2>
            <p className="text-[#8fa3bc] max-w-xl mx-auto">Jan 1, Year One — all at once. Here&apos;s how we make it work.</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ background: 'rgba(245,166,35,0.2)' }}></div>
            <div className="space-y-6">
              {[
                { day: 'Day 1', title: 'The Simple Tax Act Signed', desc: 'Federal income tax abolished. Payroll tax abolished. 23% consumption tax takes effect. Every American keeps 100% of their paycheck starting today.', color: '#06d6a0' },
                { day: 'Month 1', title: 'First Prebate Checks Sent', desc: 'Every household receives their first monthly prebate check. A family of four gets ~$598/month, no application required.', color: '#f5a623' },
                { day: 'Year 1', title: '16th Amendment Repeal Process Begins', desc: 'Congress initiates constitutional amendment process to permanently repeal the income tax. Cannot be re-imposed without full constitutional process.', color: '#00b4d8' },
                { day: 'Year 2', title: 'IRS Replaced by Consumption Tax Bureau', desc: 'New, leaner agency (under 10,000 employees vs IRS 80,000+) focused solely on ensuring businesses collect and remit the consumption tax.', color: '#f5a623' },
                { day: 'Year 3', title: 'Social Security Hybrid Launches', desc: 'New workers under 45 begin contributing to personal investment accounts. Existing retirees and those 10+ years from retirement: no change.', color: '#06d6a0' },
                { day: 'Year 10', title: 'Rate Review — Target 18%', desc: 'If spending cuts, growth, and anti-fraud measures hit targets, consumption tax rate drops toward 18%. The goal: continuous rate reduction as debt shrinks.', color: '#f5a623' },
              ].map(item => (
                <div key={item.day} className="flex gap-6">
                  <div className="w-16 shrink-0 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full z-10" style={{ background: item.color }}></div>
                  </div>
                  <div className="pb-2 -mt-0.5">
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: item.color }}>{item.day}</div>
                    <div className="font-bold text-white mb-1">{item.title}</div>
                    <div className="text-sm" style={{ color: '#8fa3bc' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back to Issues */}
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
