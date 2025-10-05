'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar/Sidebar'
import { DocumentEditor } from './editor/DocumentEditor'
import { AIChat } from './chat/AIChat'

export function EditorLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isChatVisible, setIsChatVisible] = useState(true)

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar - Menu */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Center - Document Editor */}
      <main className="flex-1 flex flex-col overflow-hidden border-l border-r border-gray-200">
        <DocumentEditor onToggleChat={() => setIsChatVisible(!isChatVisible)} />
      </main>

      {/* Right Sidebar - AI Chat */}
      {isChatVisible && (
        <aside className="w-96 bg-white flex flex-col">
          <AIChat onClose={() => setIsChatVisible(false)} />
        </aside>
      )}
    </div>
  )
}
