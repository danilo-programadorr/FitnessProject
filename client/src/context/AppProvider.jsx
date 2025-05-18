import { AuthProvider } from './AuthContext'
import { ThemeProvider } from './ThemeContext'

export const AppProvider = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </AuthProvider>
)