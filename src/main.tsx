import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainSection from './components/MainSection.tsx'
import { ContextsProvider } from './contexts/ContextsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextsProvider>
      <MainSection/>
    </ContextsProvider>
  </StrictMode>
)
