import { NextRequest, NextResponse } from 'next/server'
import { convertDocxToHtml } from '@/lib/convertDocx'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Convert to HTML with enhanced formatting
    const html = await convertDocxToHtml(buffer)

    return NextResponse.json({ html })
  } catch (error) {
    console.error('Error converting docx:', error)
    return NextResponse.json(
      { error: 'Failed to convert document' },
      { status: 500 }
    )
  }
}
