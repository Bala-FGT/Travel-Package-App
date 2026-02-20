import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import DestinationPage from './pages/DestinationPage';
import PackageDetailsPage from './pages/PackageDetailsPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationPage />} />
        <Route path="/package/:destinationId/:packageId" element={<PackageDetailsPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;