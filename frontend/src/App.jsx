import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import LoadingScreen from './components/ui/LoadingScreen'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { ScrollProgress, BackToTop } from './components/layout/ScrollUtils'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

function PortfolioLayout() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <Router>
        <ScrollProgress />
        <BackToTop />
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
          ) : (
            <Routes>
              <Route path="/" element={<PortfolioLayout />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  )
}
