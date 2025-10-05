'use client'

import { useState } from 'react'

interface AIChatProps {
  onClose: () => void
}

export function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant' as const,
      content: 'Hello! I\'m your AI legal assistant. I can help you draft clauses, review documents, and provide legal research. How can I assist you today?',
      provider: 'claude',
    },
    {
      id: '2',
      role: 'user' as const,
      content: 'What are standard rent escalation clauses for California commercial leases?',
    },
    {
      id: '3',
      role: 'assistant' as const,
      content: 'Standard rent escalation clauses for California commercial leases typically include:\n\n1. **Fixed Percentage Increase**: Annual increases of 3-5% are common\n2. **CPI-Based**: Tied to Consumer Price Index for All Urban Consumers\n3. **Fair Market Value**: Periodic adjustments to market rates\n\nCitation: Cal. Civ. Code § 1954 allows landlords to increase rent with proper notice.',
      provider: 'claude',
      citations: [
        { text: 'Cal. Civ. Code § 1954', url: '#' }
      ]
    },
  ])

  const [input, setInput] = useState('')
  const [provider, setProvider] = useState<'claude' | 'openai' | 'glm'>('claude')

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        role: 'user',
        content: input,
      },
    ])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'This is a simulated AI response. In the real application, this would connect to the selected AI provider API.',
          provider,
        },
      ])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
            <p className="text-xs text-gray-500">Powered by {provider}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label="Close chat"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Provider Selector */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <label className="text-xs font-medium text-gray-700 block mb-2">
          AI Provider
        </label>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="claude">Claude (Anthropic)</option>
          <option value="openai">GPT-4 (OpenAI)</option>
          <option value="glm">GLM-4</option>
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask about legal clauses, citations, or drafting..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            rows={3}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

interface MessageProps {
  role: 'user' | 'assistant'
  content: string
  provider?: string
  citations?: Array<{ text: string; url: string }>
}

function Message({ role, content, provider, citations }: MessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && provider && (
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            {provider}
          </div>
        )}
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{content}</p>

          {citations && citations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-2">Citations:</p>
              <div className="space-y-1">
                {citations.map((citation, idx) => (
                  <a
                    key={idx}
                    href={citation.url}
                    className="block text-xs text-blue-600 hover:underline"
                  >
                    {citation.text}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        {!isUser && (
          <div className="mt-2 flex items-center gap-2">
            <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
            <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Insert into Document
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
