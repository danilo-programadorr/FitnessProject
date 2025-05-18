import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './contexts/LoadingContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './services/i18n';

// Importações de páginas
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import WorkoutPage from './pages/Workout';
import NotFoundPage from './pages/NotFound';

// Componentes
import NotificationContainer from './components/ui/Notification';
import Layout from './components/layout/Layout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <BrowserRouter>
            <Layout>
              <NotificationContainer />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Rotas protegidas */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/workouts" element={<WorkoutPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;