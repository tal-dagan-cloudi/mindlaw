'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface AIChatProps {
  onClose: () => void
}

export function AIChat({ onClose }: AIChatProps) {
  const { t, language } = useLanguage()
  const [input, setInput] = useState('')
  const [provider, setProvider] = useState<'claude' | 'openai' | 'glm'>('claude')

  // Initialize messages based on current language
  const getInitialMessages = () => [
    {
      id: '1',
      role: 'assistant' as const,
      content: t('ai.demo.greeting'),
      provider: 'claude',
    },
    {
      id: '2',
      role: 'user' as const,
      content: t('ai.demo.userQuestion'),
    },
    {
      id: '3',
      role: 'assistant' as const,
      content: t('ai.demo.response'),
      provider: 'claude',
      citations: [
        { text: 'Cal. Civ. Code § 1954', url: '#' }
      ]
    },
  ]

  const [messages, setMessages] = useState(getInitialMessages())

  // Update messages when language changes
  useEffect(() => {
    setMessages(getInitialMessages())
  }, [language])

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
          content: t('ai.demo.simulatedResponse'),
          provider,
        },
      ])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full border-l border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-black">{t('ai.title')}</h3>
            <p className="text-xs text-gray-500">{t('ai.poweredBy')} {provider}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Close chat"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Provider Selector */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <label className="text-xs font-medium text-gray-700 block mb-2">
          {t('ai.provider')}
        </label>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
        >
          <option value="claude">Claude (Anthropic)</option>
          <option value="openai">GPT-4 (OpenAI)</option>
          <option value="glm">GLM-4</option>
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((message) => (
          <Message key={message.id} {...message} t={t} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
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
            placeholder={t('ai.placeholder')}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black text-sm"
            rows={3}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
  t: (key: string) => string
}

function Message({ role, content, provider, citations, t }: MessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && provider && (
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
            {provider}
          </div>
        )}
        <div
          className={`rounded-md px-4 py-3 ${
            isUser
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-900 border border-gray-200'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{content}</p>

          {citations && citations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className="text-xs font-medium text-gray-700 mb-2">{t('ai.citations')}</p>
              <div className="space-y-1">
                {citations.map((citation, idx) => (
                  <a
                    key={idx}
                    href={citation.url}
                    className="block text-xs text-black hover:underline font-medium"
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
            <button className="text-xs text-gray-500 hover:text-black flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {t('ai.copy')}
            </button>
            <button className="text-xs text-gray-500 hover:text-black flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t('ai.insertIntoDocument')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
