import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, zip_code, message } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const { error } = await supabase.from('subscribers').insert([
      {
        email: email.toLowerCase().trim(),
        name: name?.trim() || null,
        zip_code: zip_code?.trim() || null,
        message: message?.trim() || null,
      },
    ])

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'This email is already signed up!' }, { status: 409 })
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}
