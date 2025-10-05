'use client'

import { useState } from 'react'
import { TiptapEditor } from './TiptapEditor'

interface DocumentEditorProps {
  onToggleChat: () => void
}

export function DocumentEditor({ onToggleChat }: DocumentEditorProps) {
  const [content, setContent] = useState(`<h1>Commercial Lease Agreement</h1>

<p><strong>Parties:</strong> This Lease Agreement ("Agreement") is entered into on November 1, 2025, between:</p>

<ul>
<li><strong>Landlord:</strong> ABC Properties LLC</li>
<li><strong>Tenant:</strong> Acme Corporation</li>
</ul>

<p><strong>Property Address:</strong> 123 Main Street, San Francisco, CA 94102</p>

<h2>1. Term of Lease</h2>

<p>The lease term shall commence on December 1, 2025, and continue for a period of three (3) years, ending on November 30, 2028.</p>

<h2>2. Rent</h2>

<p>Tenant agrees to pay monthly rent of $8,500.00, payable in advance on the first day of each month.</p>

<h2>3. Security Deposit</h2>

<p>Tenant shall deposit $25,500.00 as security for performance of Tenant's obligations under this Agreement.</p>
`)

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

        {/* AI Assistant Toggle */}
        <div className="flex items-center gap-2 px-6 py-2 border-t border-gray-200">
          <button
            onClick={onToggleChat}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Assistant
          </button>
        </div>
      </div>

      {/* Tiptap Editor Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto">
          <TiptapEditor content={content} onChange={setContent} />
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

