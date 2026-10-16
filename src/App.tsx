import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import PlaceDetail from './pages/PlaceDetail'
import AddPlace from './pages/AddPlace'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<Explore />} />
        <Route path="/lieux/:slug" element={<PlaceDetail />} />
        <Route path="/ajouter" element={<AddPlace />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}