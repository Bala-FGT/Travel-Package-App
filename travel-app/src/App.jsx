import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DestinationPage from './pages/DestinationPage';
import PackageDetailsPage from './pages/PackageDetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationPage />} />
        <Route path="/package/:destinationId/:packageId" element={<PackageDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
