import { BrowserRouter, Route, Routes } from 'react-router'
import { SiteLayout } from './components/SiteLayout'
import { ChroniclePage } from './pages/ChroniclePage'
import { HomePage } from './pages/HomePage'
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
