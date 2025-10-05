'use client'

import { useState } from 'react'

interface DocumentEditorProps {
  onToggleChat: () => void
}

export function DocumentEditor({ onToggleChat }: DocumentEditorProps) {
  const [content, setContent] = useState(`# Commercial Lease Agreement

**Parties:** This Lease Agreement ("Agreement") is entered into on November 1, 2025, between:

- **Landlord:** ABC Properties LLC
- **Tenant:** Acme Corporation

**Property Address:** 123 Main Street, San Francisco, CA 94102

## 1. Term of Lease

The lease term shall commence on December 1, 2025, and continue for a period of three (3) years, ending on November 30, 2028.

## 2. Rent

Tenant agrees to pay monthly rent of $8,500.00, payable in advance on the first day of each month.

## 3. Security Deposit

Tenant shall deposit $25,500.00 as security for performance of Tenant's obligations under this Agreement.
`)

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Commercial Lease Agreement - Acme Corp
            </h2>
            <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              Draft
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Version 1.2</span>
            <div className="w-px h-6 bg-gray-300" />
            <span className="text-sm text-green-600 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Saved
            </span>
          </div>
        </div>

        {/* Editor Toolbar */}
        <div className="flex items-center gap-1 px-6 py-2 border-t border-gray-100">
          <ToolbarButton icon="B" label="Bold" />
          <ToolbarButton icon="I" label="Italic" italic />
          <ToolbarButton icon="U" label="Underline" underline />
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <ToolbarButton icon="H1" label="Heading 1" />
          <ToolbarButton icon="H2" label="Heading 2" />
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <ToolbarButton icon="•" label="Bullet List" />
          <ToolbarButton icon="1." label="Numbered List" />
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <button
            onClick={onToggleChat}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            AI Assistant
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="prose prose-lg max-w-none">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[600px] border-0 focus:outline-none resize-none font-serif text-gray-900 leading-relaxed"
              placeholder="Start typing your document..."
            />
          </div>
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

interface ToolbarButtonProps {
  icon: string
  label: string
  italic?: boolean
  underline?: boolean
}

function ToolbarButton({ icon, label, italic, underline }: ToolbarButtonProps) {
  return (
    <button
      className="p-2 hover:bg-gray-100 rounded text-gray-700 hover:text-gray-900 transition-colors"
      title={label}
    >
      <span
        className={`text-sm font-medium ${italic ? 'italic' : ''} ${underline ? 'underline' : ''}`}
      >
        {icon}
      </span>
    </button>
  )
}
