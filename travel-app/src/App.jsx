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

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationPage />} />
        <Route path="/package/:destinationId/:packageId" element={<PackageDetailsPage />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/destination/:destinationId/add" element={<PackageForm />} />
        <Route path="/admin/destination/:destinationId/edit/:packageId" element={<PackageForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;