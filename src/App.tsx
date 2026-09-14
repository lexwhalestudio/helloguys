import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { useStore } from './lib/store'
import { Compatibility } from './pages/Compatibility'
import { Home } from './pages/Home'
import { Minerals } from './pages/Minerals'
import { MoonCalendar } from './pages/MoonCalendar'
import { Onboarding } from './pages/Onboarding'
import { Profile } from './pages/Profile'
import { Shop } from './pages/Shop'
import { Tarot } from './pages/Tarot'
import { Upgrade } from './pages/Upgrade'

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const { isOnboarded } = useStore()
  if (!isOnboarded) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

function App() {
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route
        element={
          <RequireOnboarding>
            <Layout />
          </RequireOnboarding>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/moon" element={<MoonCalendar />} />
        <Route path="/tarot" element={<Tarot />} />
        <Route path="/minerals" element={<Minerals />} />
        <Route path="/compatibility" element={<Compatibility />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/shop" element={<Shop />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
