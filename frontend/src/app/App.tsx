import { ThemeProvider } from './providers/ThemeProvider';
import { AppRoutes } from '../routes/AppRoutes';
import { AuthProvider } from '../features/auth/context/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;