import { useState, useRef } from 'react';
import { updateDestinationImage } from '../data/packageService';
import './DestinationImageUpload.css';

function DestinationImageUpload({ destination, onImageUpdated }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    setUploading(true);

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setPreview(base64);
      setUploading(false);
    };
    reader.onerror = () => {
      alert('Error reading file');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (preview) {
      updateDestinationImage(destination.id, preview);
      if (onImageUpdated) {
        onImageUpdated();
      }
      alert('Image updated successfully!');
    }
  };

  const handleCancel = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-container">
      <div className="current-image">
        <img 
          src={preview || destination.image} 
          alt={destination.name} 
        />
      </div>
      
      {!preview ? (
        <div className="upload-actions">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            id={`upload-${destination.id}`}
          />
          <label htmlFor={`upload-${destination.id}`} className="upload-btn">
            📷 Change Image
          </label>
        </div>
      ) : (
        <div className="preview-actions">
          <button onClick={handleSave} className="save-btn" disabled={uploading}>
            ✅ Save
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            ❌ Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default DestinationImageUpload;
