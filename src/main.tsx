import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Grid from './components/Grid.tsx'
import MainSection from './components/MainSection.tsx'
import { ContextsProvider } from './contexts/ContextsProvider.tsx'
import { ItemList } from './components/ItemList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextsProvider>
      <MainSection>
        <ItemList/>
        <Grid/>
      </MainSection>
    </ContextsProvider>
  </StrictMode>
)
