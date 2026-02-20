import { useParams, Link } from 'react-router-dom';
import { getDestination } from '../data/destinations';
import './DestinationPage.css';

function DestinationPage() {
  const { id } = useParams();
  const destination = getDestination(id);

  if (!destination) {
    return (
      <div className="not-found">
        <h2>Destination not found</h2>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="destination-page">
      <header className="destination-header">
        <Link to="/" className="back-link">← Back to Destinations</Link>
        <div className="header-content">
          <img src={destination.image} alt={destination.name} className="header-image" />
          <div className="header-text">
            <h1>{destination.name}</h1>
            <p>{destination.description}</p>
          </div>
        </div>
      </header>

      <main className="packages-section">
        <h2>Available Packages</h2>
        <div className="packages-grid">
          {destination.packages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div className="package-info">
                <h3>{pkg.title}</h3>
                <span className="duration">{pkg.duration}</span>
                <ul className="highlights">
                  {pkg.highlights.map((highlight, index) => (
                    <li key={index}>✓ {highlight}</li>
                  ))}
                </ul>
                <div className="package-footer">
                  <span className="price">{pkg.price}</span>
                  <Link to={`/package/${destination.id}/${pkg.id}`} className="view-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default DestinationPage;
