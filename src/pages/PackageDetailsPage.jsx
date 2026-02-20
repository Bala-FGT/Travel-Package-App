import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDestination, getPackage } from '../data/destinations';
import LeadForm from '../components/LeadForm';
import './PackageDetailsPage.css';

function PackageDetailsPage() {
  const { destinationId, packageId } = useParams();
  const destination = getDestination(destinationId);
  const pkg = getPackage(destinationId, packageId);
  const [showForm, setShowForm] = useState(false);

  if (!destination || !pkg) {
    return (
      <div className="not-found">
        <h2>Package not found</h2>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  if (showForm) {
    return (
      <LeadForm 
        destinationName={destination.name} 
        packageName={pkg.title}
        onClose={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="package-details-page">
      <header className="package-header">
        <Link to={`/destination/${destinationId}`} className="back-link">
          ← Back to {destination.name}
        </Link>
      </header>

      <main className="package-content">
        <div className="package-main">
          <h1>{pkg.title}</h1>
          <span className="package-duration">{pkg.duration}</span>
          
          <div className="package-section">
            <h2>Package Highlights</h2>
            <ul className="highlights-list">
              {pkg.highlights.map((highlight, index) => (
                <li key={index}>
                  <span className="highlight-icon">✓</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="package-section">
            <h2>About This Package</h2>
            <p>
              Experience the beauty of {destination.name} with our carefully curated package.
              This {pkg.duration} trip includes all the must-visit attractions and provides
              a comfortable stay experience. Our package is designed to give you the best
              of {destination.name} while ensuring comfort and convenience.
            </p>
          </div>
        </div>

        <div className="package-sidebar">
          <div className="booking-card">
            <div className="price-tag">
              <span className="price-label">Starting from</span>
              <span className="price-value">{pkg.price}</span>
              <span className="price-note">per person</span>
            </div>
            
            <button className="interest-btn" onClick={() => setShowForm(true)}>
              Show Interest
            </button>
            
            <p className="booking-note">
              📞 Call us: +91 70126 31439<br />
              💬 WhatsApp: +91 70126 31439
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PackageDetailsPage;
