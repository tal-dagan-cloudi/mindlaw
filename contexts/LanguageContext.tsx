'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'he'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Sidebar
    'sidebar.title': 'Mind.Law',
    'sidebar.newDocument': 'New Document',
    'sidebar.allDocuments': 'All Documents',
    'sidebar.favorites': 'Favorites',
    'sidebar.templates': 'Templates',
    'sidebar.recent': 'Recent',
    'sidebar.recentDocuments': 'RECENT DOCUMENTS',
    'sidebar.attorney': 'Attorney',

    // Document statuses
    'status.draft': 'Draft',
    'status.inReview': 'In Review',
    'status.finalized': 'Finalized',

    // Time
    'time.hoursAgo': 'hours ago',
    'time.dayAgo': 'day ago',
    'time.daysAgo': 'days ago',

    // Editor
    'editor.version': 'Version',
    'editor.saved': 'Saved',
    'editor.aiAssistant': 'AI Assistant',
    'editor.words': 'words',
    'editor.characters': 'characters',
    'editor.lastEditedBy': 'Last edited by',
    'editor.jurisdiction': 'US-CA Jurisdiction',
    'editor.contract': 'Contract',

    // AI Chat
    'ai.title': 'AI Assistant',
    'ai.poweredBy': 'Powered by',
    'ai.provider': 'AI Provider',
    'ai.placeholder': 'Ask about legal clauses, citations, or drafting...',
    'ai.copy': 'Copy',
    'ai.insertIntoDocument': 'Insert into Document',
    'ai.citations': 'Citations:',

    // Documents
    'doc.commercialLease': 'Commercial Lease Agreement - Acme Corp',
    'doc.serviceContract': 'Service Contract - Tech Solutions Inc',
    'doc.employmentAgreement': 'Employment Agreement - Jane Doe',

    // AI Demo Messages
    'ai.demo.greeting': 'Hello! I\'m your AI legal assistant. I can help you draft clauses, review documents, and provide legal research. How can I assist you today?',
    'ai.demo.userQuestion': 'What are standard rent escalation clauses for California commercial leases?',
    'ai.demo.response': 'Standard rent escalation clauses for California commercial leases typically include:\n\n1. **Fixed Percentage Increase**: Annual increases of 3-5% are common\n2. **CPI-Based**: Tied to Consumer Price Index for All Urban Consumers\n3. **Fair Market Value**: Periodic adjustments to market rates\n\nCitation: Cal. Civ. Code § 1954 allows landlords to increase rent with proper notice.',
    'ai.demo.simulatedResponse': 'This is a simulated AI response. In the real application, this would connect to the selected AI provider API.',
  },
  he: {
    // Sidebar
    'sidebar.title': 'Mind.Law',
    'sidebar.newDocument': 'מסמך חדש',
    'sidebar.allDocuments': 'כל המסמכים',
    'sidebar.favorites': 'מועדפים',
    'sidebar.templates': 'תבניות',
    'sidebar.recent': 'אחרונים',
    'sidebar.recentDocuments': 'מסמכים אחרונים',
    'sidebar.attorney': 'עורך דין',

    // Document statuses
    'status.draft': 'טיוטה',
    'status.inReview': 'בבדיקה',
    'status.finalized': 'סופי',

    // Time
    'time.hoursAgo': 'שעות',
    'time.dayAgo': 'יום',
    'time.daysAgo': 'ימים',

    // Editor
    'editor.version': 'גרסה',
    'editor.saved': 'נשמר',
    'editor.aiAssistant': 'עוזר AI',
    'editor.words': 'מילים',
    'editor.characters': 'תווים',
    'editor.lastEditedBy': 'נערך לאחרונה על ידי',
    'editor.jurisdiction': 'תחום שיפוט: ארה״ב-קליפורניה',
    'editor.contract': 'חוזה',

    // AI Chat
    'ai.title': 'עוזר AI',
    'ai.poweredBy': 'מופעל על ידי',
    'ai.provider': 'ספק AI',
    'ai.placeholder': 'שאל על סעיפים משפטיים, ציטוטים או ניסוח...',
    'ai.copy': 'העתק',
    'ai.insertIntoDocument': 'הוסף למסמך',
    'ai.citations': 'ציטוטים:',

    // Documents
    'doc.commercialLease': 'הסכם שכירות מסחרי - Acme Corp',
    'doc.serviceContract': 'חוזה שירות - Tech Solutions Inc',
    'doc.employmentAgreement': 'הסכם העסקה - ג\'יין דו',

    // AI Demo Messages
    'ai.demo.greeting': 'שלום! אני העוזר המשפטי הדיגיטלי שלך. אני יכול לעזור לך לנסח סעיפים, לסקור מסמכים ולספק מחקר משפטי. כיצד אוכל לעזור לך היום?',
    'ai.demo.userQuestion': 'מהם סעיפי הצמדה סטנדרטיים בחוזי שכירות מסחריים בקליפורניה?',
    'ai.demo.response': 'סעיפי הצמדה סטנדרטיים בחוזי שכירות מסחריים בקליפורניה כוללים בדרך כלל:\n\n1. **עלייה באחוזים קבועים**: עליות שנתיות של 3-5% נפוצות\n2. **מבוסס מדד**: קשור למדד המחירים לצרכן\n3. **שווי שוק הוגן**: התאמות תקופתיות לתעריפי השוק\n\nציטוט: Cal. Civ. Code § 1954 מאפשר לבעלי נכסים להעלות שכר דירה בהודעה מתאימה.',
    'ai.demo.simulatedResponse': 'זוהי תשובת AI מדומה. באפליקציה האמיתית, זה יתחבר ל-API של ספק ה-AI שנבחר.',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'he' : 'en'))
    // Update document direction
    document.documentElement.dir = language === 'en' ? 'rtl' : 'ltr'
    document.documentElement.lang = language === 'en' ? 'he' : 'en'
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
