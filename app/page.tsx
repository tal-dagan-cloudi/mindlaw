import { EditorLayout } from '@/components/EditorLayout'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function Home() {
  return (
    <LanguageProvider>
      <EditorLayout />
    </LanguageProvider>
  )
}
