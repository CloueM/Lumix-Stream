import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Popular from './pages/categories/popular'
import NowPlaying from './pages/categories/now-playing'
import Upcoming from './pages/categories/upcoming'
import Search from './pages/search'
import UserBookmark from './pages/user-bookmark'
import AboutLumix from './pages/about-lumix'
import TopRated from './pages/categories/top-rated'
import View from './pages/view'
import PrivacyPolicy from './pages/privacy-policy'
import TermsOfService from './pages/terms-of-service'



function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/now-playing" element={<NowPlaying />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/search" element={<Search />} />
            <Route path="/bookmark" element={<UserBookmark />} />
            <Route path="/about" element={<AboutLumix />} />
            <Route path="/movie/:id" element={<View />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
