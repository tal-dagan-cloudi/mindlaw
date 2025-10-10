import { NextResponse } from 'next/server'
import { convertDocxToHtml } from '@/lib/convertDocx'

export async function GET() {
  try {
    const filePath = '/Users/tald/Desktop/68900-06-25 (1).docx'
    const html = await convertDocxToHtml(filePath)
    return NextResponse.json({ html })
  } catch (error) {
    console.error('Error converting docx:', error)
    return NextResponse.json(
      { error: 'Failed to convert document' },
      { status: 500 }
    )
  }
}
