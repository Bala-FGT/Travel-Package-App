import { useState } from 'react';
import './LeadForm.css';

function LeadForm({ destinationName, packageName, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelDate: '',
    travelers: ''
  });
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }
    
    if (formData.travelers && (formData.travelers < 1 || formData.travelers > 20)) {
      newErrors.travelers = 'Travelers must be between 1 and 20';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone' || name === 'travelers') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Save lead to local storage
    const lead = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      travelDate: formData.travelDate || null,
      travelers: formData.travelers || null,
      destination: destinationName,
      package: packageName,
      timestamp: new Date().toISOString()
    };
    
    const existingLeads = JSON.parse(localStorage.getItem('travelLeads') || '[]');
    localStorage.setItem('travelLeads', JSON.stringify([...existingLeads, lead]));
    
    setIsSubmitting(false);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    if (onClose) {
      onClose();
    }
  };

  if (showConfirmation) {
    return (
      <div className="confirmation-overlay">
        <div className="confirmation-modal">
          <div className="confirmation-icon">✓</div>
          <h2>Thank You!</h2>
          <p>Your interest has been recorded successfully.</p>
          <p className="confirmation-message">
            We'll contact you soon at <strong>{formData.phone}</strong>
          </p>
          <button className="ok-btn" onClick={handleConfirmationClose}>
            OK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-form-page">
      <div className="form-container">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="form-header">
          <h1>Show Your Interest</h1>
          <p className="package-info">
            {packageName} - {destinationName}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="lead-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="travelDate">Preferred Travel Date</label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="travelers">Number of Travelers</label>
            <input
              type="number"
              id="travelers"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              placeholder="1-20"
              min={1}
              max={20}
              className={errors.travelers ? 'error' : ''}
            />
            {errors.travelers && <span className="error-message">{errors.travelers}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Interest'}
          </button>
        </form>

        <p className="form-note">
          📞 Call us: +91 70126 31439 | 💬 WhatsApp: +91 70126 31439
        </p>
      </div>
    </div>
  );
}

export default LeadForm;
