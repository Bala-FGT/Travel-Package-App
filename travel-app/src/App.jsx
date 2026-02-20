import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import DestinationPage from './pages/DestinationPage';
import PackageDetailsPage from './pages/PackageDetailsPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PackageForm from './pages/PackageForm';
import './App.css';

const base = import.meta.env.BASE_URL || '/';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Routes>
        <Route path={base} element={<HomePage />} />
        <Route path={`${base}destination/:id`} element={<DestinationPage />} />
        <Route path={`${base}package/:destinationId/:packageId`} element={<PackageDetailsPage />} />
        {/* Admin Routes */}
        <Route path={`${base}admin`} element={<AdminLogin />} />
        <Route path={`${base}admin/dashboard`} element={<AdminDashboard />} />
        <Route path={`${base}admin/destination/:destinationId/add`} element={<PackageForm />} />
        <Route path={`${base}admin/destination/:destinationId/edit/:packageId`} element={<PackageForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;