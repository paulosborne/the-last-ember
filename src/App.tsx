import { BrowserRouter, Route, Routes } from 'react-router'
import { SiteLayout } from './components/SiteLayout'
import { ChroniclePage } from './pages/ChroniclePage'
import { ChronicleArticlePage } from './pages/ChronicleArticlePage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { VillagePage } from './pages/VillagePage'
import { VillagersPage } from './pages/VillagersPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="village" element={<VillagePage />} />
          <Route path="villagers" element={<VillagersPage />} />
          <Route path="chronicle" element={<ChroniclePage />} />
          <Route path="chronicle/:slug" element={<ChronicleArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
