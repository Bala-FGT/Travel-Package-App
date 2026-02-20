import { Link } from 'react-router-dom';
import { getAllDestinations } from '../data/packageService';
import './HomePage.css';

function HomePage() {
  const destinations = getAllDestinations();
  const basePath = import.meta.env.BASE_URL || '/';
  
  return (
    <div className="home-page">
      <header className="hero">
        <div className="hero-content">
          <h1>Explore South India's Beautiful Hill Stations</h1>
          <p>Discover the perfect getaway with our curated travel packages</p>
        </div>
      </header>
      
      <main className="destinations-section">
        <h2>Choose Your Destination</h2>
        <div className="destinations-grid">
          {destinations.map((destination) => (
            <Link 
              to={`/destination/${destination.id}`} 
              key={destination.id} 
              className="destination-card"
            >
              <div className="destination-image">
                <img src={destination.image} alt={destination.name} />
              </div>
              <div className="destination-info">
                <h3>{destination.name}</h3>
                <p>{destination.description.substring(0, 80)}...</p>
                <span className="packages-count">
                  {destination.packages.length} packages available
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      
      <footer className="home-footer">
        <p>📞 Call us: +91 70126 31439 | 💬 WhatsApp: +91 70126 31439</p>
        <a href={`${basePath}admin`} className="admin-link">Admin Login</a>
      </footer>
    </div>
  );
}

export default HomePage;
