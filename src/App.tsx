import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { useStore } from './lib/store'
import { Auth } from './pages/Auth'
import { Compatibility } from './pages/Compatibility'
import { Gift } from './pages/Gift'
import { Guide } from './pages/Guide'
import { Home } from './pages/Home'
import { Minerals } from './pages/Minerals'
import { MoonCalendar } from './pages/MoonCalendar'
import { Onboarding } from './pages/Onboarding'
import { Privacy } from './pages/Privacy'
import { Profile } from './pages/Profile'
import { Reveal } from './pages/Reveal'
import { Shop } from './pages/Shop'
import { Tarot } from './pages/Tarot'
import { Upgrade } from './pages/Upgrade'

function RequireAccount({ children }: { children: React.ReactNode }) {
  const { hasAccount } = useStore()
  if (!hasAccount) return <Navigate to="/login" replace />
  return <>{children}</>
}

function RequireProfile({ children }: { children: React.ReactNode }) {
  const { hasAccount, isOnboarded } = useStore()
  if (!hasAccount) return <Navigate to="/login" replace />
  if (!isOnboarded) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const { hasAccount, isOnboarded, profile } = useStore()
  if (!hasAccount) return <Navigate to="/login" replace />
  if (!isOnboarded) return <Navigate to="/onboarding" replace />
  if (!profile.firstRunComplete) return <Navigate to="/guide" replace />
  if (!profile.firstReadingChoice) return <Navigate to="/reveal" replace />
  return <>{children}</>
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route
        path="/onboarding"
        element={
          <RequireAccount>
            <Onboarding />
          </RequireAccount>
        }
      />
      <Route
        path="/guide"
        element={
          <RequireProfile>
            <Guide />
          </RequireProfile>
        }
      />
      <Route
        path="/gift"
        element={
          <RequireProfile>
            <Gift />
          </RequireProfile>
        }
      />
      <Route
        path="/reveal"
        element={
          <RequireProfile>
            <Reveal />
          </RequireProfile>
        }
      />
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
