'use client'

import { useEffect, useRef } from 'react'
import { renderAsync } from 'docx-preview'

interface DocxViewerProps {
  filePath: string
}

export function DocxViewer({ filePath }: DocxViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadDocument() {
      if (!containerRef.current) return

      try {
        const response = await fetch('/api/load-docx')
        const blob = await response.blob()

        await renderAsync(blob, containerRef.current, undefined, {
          className: 'docx-preview',
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          ignoreLastRenderedPageBreak: true,
          experimental: false,
          trimXmlDeclaration: true,
          useBase64URL: false,
          useMathMLPolyfill: false,
        })
      } catch (error) {
        console.error('Failed to load document:', error)
        if (containerRef.current) {
          containerRef.current.innerHTML = '<p style="color: red;">Error loading document</p>'
        }
      }
    }

    loadDocument()
  }, [filePath])

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[600px] bg-white px-8 py-6"
      style={{ direction: 'rtl' }}
    />
  )
}
