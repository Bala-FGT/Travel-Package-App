import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDestinations, deletePackage } from '../data/packageService';
import DestinationImageUpload from '../components/DestinationImageUpload';
import './AdminDashboard.css';

function AdminDashboard() {
  const [destinations, setDestinations] = useState(() => getAllDestinations());
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    const session = localStorage.getItem('adminSession');
    if (!session) {
      navigate('/admin');
    }
  }, [navigate]);

  const refreshDestinations = () => {
    const data = getAllDestinations();
    setDestinations(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin');
  };

  const handleDeletePackage = (destinationId, packageId) => {
    deletePackage(destinationId, packageId);
    setShowDeleteConfirm(null);
    refreshDestinations();
    // Also refresh selected destination if viewing packages
    if (selectedDestination && selectedDestination.id === destinationId) {
      const updated = getAllDestinations().find(d => d.id === destinationId);
      setSelectedDestination(updated);
    }
  };

  if (selectedDestination) {
    return (
      <div className="admin-dashboard">
        <header className="admin-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => setSelectedDestination(null)}>
              ← Back
            </button>
            <h1>{selectedDestination.name} - Packages</h1>
          </div>
          <div className="header-right">
            <Link to={`/admin/destination/${selectedDestination.id}/add`} className="add-btn">
              + Add Package
            </Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </header>

        <main className="admin-content">
          {/* Destination Image Upload Section */}
          <div className="destination-image-section">
            <h3>Destination Image</h3>
            <DestinationImageUpload 
              destination={selectedDestination} 
              onImageUpdated={refreshDestinations}
            />
          </div>

          <h2>Packages</h2>
          <div className="packages-grid">
            {selectedDestination.packages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-info">
                  <h3>{pkg.title}</h3>
                  <p className="duration">{pkg.duration}</p>
                  <p className="price">{pkg.price}</p>
                  <div className="highlights">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="highlight-tag">{h}</span>
                    ))}
                  </div>
                </div>
                <div className="package-actions">
                  <Link 
                    to={`/admin/destination/${selectedDestination.id}/edit/${pkg.id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => setShowDeleteConfirm({ destinationId: selectedDestination.id, packageId: pkg.id, packageName: pkg.title })}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedDestination.packages.length === 0 && (
            <div className="empty-state">
              <p>No packages yet. Add your first package!</p>
              <Link to={`/admin/destination/${selectedDestination.id}/add`} className="add-btn">
                + Add Package
              </Link>
            </div>
          )}
        </main>

        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Delete Package</h3>
              <p>Are you sure you want to delete "{showDeleteConfirm.packageName}"?</p>
              <div className="modal-actions">
                <button onClick={() => setShowDeleteConfirm(null)} className="cancel-btn">
                  Cancel
                </button>
                <button 
                  onClick={() => handleDeletePackage(showDeleteConfirm.destinationId, showDeleteConfirm.packageId)}
                  className="confirm-delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="header-right">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="admin-content">
        <h2>Select a Destination to Manage</h2>
        <div className="destinations-grid">
          {destinations.map((dest) => (
            <div 
              key={dest.id} 
              className="destination-card"
              onClick={() => setSelectedDestination(dest)}
            >
              <div className="destination-image">
                <img src={dest.image} alt={dest.name} />
              </div>
              <div className="destination-info">
                <h3>{dest.name}</h3>
                <p>{dest.packages.length} packages</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
