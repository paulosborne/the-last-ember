import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router'
import { SiteLayout } from './components/SiteLayout'
import { publishedChronicles } from './content/chronicles'
import { resolveChronicleRoute } from './content/chronicle-routes'
import { ChroniclePage } from './pages/ChroniclePage'
import { ChronicleArticlePage } from './pages/ChronicleArticlePage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { VillagePage } from './pages/VillagePage'
import { VillagersPage } from './pages/VillagersPage'
import { chroniclePreviewRoute } from 'virtual:chronicle-preview-route'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="village" element={<VillagePage />} />
          <Route path="villagers" element={<VillagersPage />} />
          <Route path="chronicles" element={<ChroniclePage />} />
          {chroniclePreviewRoute}
          <Route path="chronicles/:slug" element={<ChronicleArticlePage />} />
          <Route path="chronicle" element={<Navigate to="/chronicles" replace />} />
          <Route path="chronicle/:slug" element={<LegacyChronicleArticle />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function LegacyChronicleArticle() {
  const { slug } = useParams()
  const route = resolveChronicleRoute(`/chronicle/${slug ?? ''}`, publishedChronicles)
  return route.kind === 'redirect' ? <Navigate to={route.to} replace /> : <NotFoundPage />
}

export default App
