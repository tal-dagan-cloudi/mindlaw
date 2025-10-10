import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'

export async function GET() {
  try {
    const filePath = '/Users/tald/Desktop/68900-06-25 (1).docx'
    const buffer = await fs.readFile(filePath)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'inline; filename="document.docx"',
      },
    })
  } catch (error) {
    console.error('Error loading docx:', error)
    return NextResponse.json(
      { error: 'Failed to load document' },
      { status: 500 }
    )
  }
}
