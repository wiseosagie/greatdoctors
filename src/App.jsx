import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'
import ConsultationPage from './pages/ConsultationPage'
import AdminPage from './pages/AdminPage'
import AuthPage from './pages/AuthPage'
import PatientDashboard from './pages/PatientDashboard'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  const noChrome = pathname === '/admin' || pathname === '/auth'

  return (
    <>
      {!noChrome && <Navbar />}
      <main>
        <Routes>
          <Route path="/"                     element={<HomePage />} />
          <Route path="/services"             element={<ServicesPage />} />
          <Route path="/team"                 element={<TeamPage />} />
          <Route path="/contact"              element={<ContactPage />} />
          <Route path="/consult/:conditionId" element={<ConsultationPage />} />
          <Route path="/admin"                element={<AdminPage />} />
          <Route path="/auth"                 element={<AuthPage />} />
          <Route path="/dashboard"            element={<PatientDashboard />} />
          <Route path="*"                     element={<HomePage />} />
        </Routes>
      </main>
      {!noChrome && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  )
}
