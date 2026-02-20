import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDestination, addPackage, updatePackage } from '../data/packageService';
import './PackageForm.css';

function PackageForm() {
  const { destinationId, packageId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(packageId);

  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    highlights: '',
    price: ''
  });
  const [errors, setErrors] = useState({});
  const [destination, setDestination] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check admin authentication
    const session = localStorage.getItem('adminSession');
    if (!session) {
      navigate('/admin');
      return;
    }

    // Load destination
    const dest = getDestination(destinationId);
    if (!dest) {
      navigate('/admin/dashboard');
      return;
    }
    setDestination(dest);

    // If editing, load package data
    if (isEditMode) {
      const pkg = dest.packages.find(p => p.id === packageId);
      if (pkg) {
        setFormData({
          title: pkg.title,
          duration: pkg.duration,
          highlights: pkg.highlights.join(', '),
          price: pkg.price
        });
      } else {
        navigate('/admin/dashboard');
      }
    }
  }, [destinationId, packageId, isEditMode, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.duration || formData.duration.trim().length < 3) {
      newErrors.duration = 'Duration is required';
    }

    if (!formData.price || formData.price.trim().length === 0) {
      newErrors.price = 'Price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const packageData = {
      title: formData.title.trim(),
      duration: formData.duration.trim(),
      highlights: formData.highlights.split(',').map(h => h.trim()).filter(h => h),
      price: formData.price.trim()
    };

    try {
      if (isEditMode) {
        updatePackage(destinationId, packageId, packageData);
        setSuccessMessage('Package updated successfully!');
      } else {
        addPackage(destinationId, packageData);
        setSuccessMessage('Package added successfully!');
      }

      // Redirect after short delay
      setTimeout(() => {
        navigate(`/admin/dashboard`);
      }, 1500);
    } catch (error) {
      setErrors({ submit: error.message });
    }

    setIsSubmitting(false);
  };

  if (successMessage) {
    return (
      <div className="package-form-page">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>{successMessage}</h2>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="package-form-page">
      <div className="form-container">
        <div className="form-header">
          <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
            ← Back to Dashboard
          </button>
          <h1>{isEditMode ? 'Edit Package' : 'Add New Package'}</h1>
          <p className="destination-name">{destination?.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="package-form">
          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <div className="form-group">
            <label htmlFor="title">Package Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Ooty Family Package"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration *</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 3 Days / 2 Nights"
              className={errors.duration ? 'error' : ''}
            />
            {errors.duration && <span className="error-text">{errors.duration}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., ₹15,000"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="highlights">Highlights</label>
            <textarea
              id="highlights"
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
              placeholder="Enter highlights separated by commas&#10;e.g., Tea Garden Visit, Lake Boating, Botanical Garden"
              rows={4}
            />
            <span className="help-text">Separate multiple highlights with commas</span>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/admin/dashboard')}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Package' : 'Add Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PackageForm;
