'use client'

import { cn } from '@/lib/utils'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const documents = [
    { id: '1', title: 'Commercial Lease Agreement - Acme Corp', status: 'draft', updated: '2 hours ago' },
    { id: '2', title: 'Service Contract - Tech Solutions Inc', status: 'in_review', updated: '1 day ago' },
    { id: '3', title: 'Employment Agreement - Jane Doe', status: 'finalized', updated: '3 days ago' },
  ]

  return (
    <aside
      className={cn(
        'bg-white flex flex-col transition-all duration-300 border-r border-gray-200',
        isCollapsed ? 'w-16' : 'w-72'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-medium text-black">
            Mind<span className="text-gray-400">.</span>Law
          </h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      {!isCollapsed && (
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* New Document Button */}
          <button className="w-full bg-black text-white px-4 py-3 rounded-md font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Document
          </button>

          {/* Menu Items */}
          <div className="mt-6 space-y-1">
            <NavItem icon="📄" label="All Documents" active />
            <NavItem icon="⭐" label="Favorites" />
            <NavItem icon="📋" label="Templates" />
            <NavItem icon="🗂️" label="Recent" />
          </div>

          {/* Document List */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Recent Documents
            </h3>
            <div className="space-y-1">
              {documents.map((doc) => (
                <DocumentItem key={doc.id} {...doc} />
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* User Menu */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-sm font-bold text-white">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-black">John Doe</p>
              <p className="text-xs text-gray-500">Attorney</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <button
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm',
        active
          ? 'bg-gray-100 text-black font-medium'
          : 'text-gray-700 hover:bg-gray-50 hover:text-black'
      )}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function DocumentItem({ title, status, updated }: { title: string; status: string; updated: string }) {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-700 border border-gray-200',
    in_review: 'bg-gray-100 text-gray-700 border border-gray-200',
    finalized: 'bg-gray-100 text-black border border-gray-300',
  }

  const statusIcons = {
    draft: '○',
    in_review: '◐',
    finalized: '●',
  }

  return (
    <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 transition-colors group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-black truncate group-hover:text-black">
            {title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-md font-medium',
                statusColors[status as keyof typeof statusColors]
              )}
            >
              <span className="mr-1">{statusIcons[status as keyof typeof statusIcons]}</span>
              {status.replace('_', ' ')}
            </span>
            <span className="text-xs text-gray-500">{updated}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
