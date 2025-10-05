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
        'bg-zinc-900 text-white flex flex-col transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-72'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-serif font-bold">mind.law</h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      {!isCollapsed && (
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* New Document Button */}
          <button className="w-full bg-white text-zinc-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
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
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
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
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Attorney</p>
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
        'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm',
        active
          ? 'bg-zinc-800 text-white'
          : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
      )}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function DocumentItem({ title, status, updated }: { title: string; status: string; updated: string }) {
  const statusColors = {
    draft: 'bg-yellow-500/10 text-yellow-500',
    in_review: 'bg-blue-500/10 text-blue-500',
    finalized: 'bg-green-500/10 text-green-500',
  }

  return (
    <button className="w-full text-left p-3 rounded-lg hover:bg-zinc-800 transition-colors group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate group-hover:text-white">
            {title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full font-medium',
                statusColors[status as keyof typeof statusColors]
              )}
            >
              {status.replace('_', ' ')}
            </span>
            <span className="text-xs text-gray-500">{updated}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
