import { destinations as defaultDestinations } from './destinations';

const STORAGE_KEY = 'adminPackages';
const DESTINATION_IMAGES_KEY = 'adminDestinationImages';

// Get all packages (from localStorage or default)
export const getAllDestinations = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  let dests = stored ? JSON.parse(stored) : defaultDestinations;
  
  // Merge with custom destination images if any
  const customImages = JSON.parse(localStorage.getItem(DESTINATION_IMAGES_KEY) || '{}');
  if (Object.keys(customImages).length > 0) {
    dests = dests.map(dest => ({
      ...dest,
      image: customImages[dest.id] || dest.image
    }));
  }
  
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDestinations));
  }
  return dests;
};

// Get a single destination with its packages
export const getDestination = (id) => {
  const destinations = getAllDestinations();
  return destinations.find(dest => dest.id === id);
};

// Get a single package
export const getPackage = (destinationId, packageId) => {
  const destination = getDestination(destinationId);
  if (!destination) return null;
  return destination.packages.find(pkg => pkg.id === packageId);
};

// Add a new package to a destination
export const addPackage = (destinationId, packageData) => {
  const destinations = getAllDestinations();
  const destinationIndex = destinations.findIndex(dest => dest.id === destinationId);
  
  if (destinationIndex === -1) {
    throw new Error('Destination not found');
  }
  
  const newPackage = {
    id: `${destinationId}-${Date.now()}`,
    ...packageData
  };
  
  destinations[destinationIndex].packages.push(newPackage);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(destinations));
  
  return newPackage;
};

// Update an existing package
export const updatePackage = (destinationId, packageId, packageData) => {
  const destinations = getAllDestinations();
  const destinationIndex = destinations.findIndex(dest => dest.id === destinationId);
  
  if (destinationIndex === -1) {
    throw new Error('Destination not found');
  }
  
  const packageIndex = destinations[destinationIndex].packages.findIndex(
    pkg => pkg.id === packageId
  );
  
  if (packageIndex === -1) {
    throw new Error('Package not found');
  }
  
  destinations[destinationIndex].packages[packageIndex] = {
    ...destinations[destinationIndex].packages[packageIndex],
    ...packageData
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(destinations));
  
  return destinations[destinationIndex].packages[packageIndex];
};

// Delete a package
export const deletePackage = (destinationId, packageId) => {
  const destinations = getAllDestinations();
  const destinationIndex = destinations.findIndex(dest => dest.id === destinationId);
  
  if (destinationIndex === -1) {
    throw new Error('Destination not found');
  }
  
  destinations[destinationIndex].packages = destinations[destinationIndex].packages.filter(
    pkg => pkg.id !== packageId
  );
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(destinations));
  
  return true;
};

// Update destination image
export const updateDestinationImage = (destinationId, imageData) => {
  const customImages = JSON.parse(localStorage.getItem(DESTINATION_IMAGES_KEY) || '{}');
  customImages[destinationId] = imageData;
  localStorage.setItem(DESTINATION_IMAGES_KEY, JSON.stringify(customImages));
  return true;
};

// Get custom destination images
export const getDestinationImages = () => {
  return JSON.parse(localStorage.getItem(DESTINATION_IMAGES_KEY) || '{}');
};

// Reset to default (for testing)
export const resetToDefault = () => {
  localStorage.removeItem(STORAGE_KEY);
  return getAllDestinations();
};

// Check if data has been customized
export const isDataCustomized = () => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};
