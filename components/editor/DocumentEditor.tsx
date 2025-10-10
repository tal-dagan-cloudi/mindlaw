'use client'

import { useState } from 'react'
import { TiptapEditorFull } from './TiptapEditorFull'
import { useLanguage } from '@/contexts/LanguageContext'

interface DocumentEditorProps {
  onToggleChat: () => void
}

export function DocumentEditor({ onToggleChat }: DocumentEditorProps) {
  const { t, language, toggleLanguage } = useLanguage()
  const [content, setContent] = useState(`<h1>Click "Upload Document" to load a .docx file</h1><p>Or start typing to create a new document...</p>`)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.docx')) {
      alert('Please select a .docx file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload-docx', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data.html) {
        setContent(data.html)
      }
    } catch (error) {
      console.error('Failed to upload document:', error)
      alert('Error uploading document. Please try again.')
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-black">
              Commercial Lease Agreement - Acme Corp
            </h2>
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border border-gray-200">
              <span className="mr-1">○</span>Draft
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Version 1.2</span>
            <div className="w-px h-4 bg-gray-300" />
            <span className="text-sm text-gray-700 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              Saved
            </span>
          </div>
        </div>

        {/* Toolbar Actions */}
        <div className="flex items-center gap-2 px-6 py-2 border-t border-gray-200">
          <button
            onClick={onToggleChat}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t('editor.aiAssistant')}
          </button>

          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-white border border-gray-300 text-black text-sm font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
            title={language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {language === 'en' ? 'עברית' : 'English'}
          </button>

          <label className="px-4 py-2 bg-white border border-gray-300 text-black text-sm font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Document
            <input
              type="file"
              accept=".docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Tiptap Editor Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-full">
          <TiptapEditorFull key={content.substring(0, 50)} content={content} onChange={setContent} />
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t border-gray-200 px-6 py-2 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span>1,247 words</span>
            <span>•</span>
            <span>6,892 characters</span>
            <span>•</span>
            <span>Last edited by John Doe</span>
          </div>
          <div className="flex items-center gap-4">
            <span>US-CA Jurisdiction</span>
            <span>•</span>
            <span>Contract</span>
          </div>
        </div>
      </div>
    </div>
  )
}

