// Destination data for the Travel Package App

export const destinations = [
  {
    id: 'ooty',
    name: 'Ooty',
    description: 'The Queen of Hill Stations, known for its tea gardens, colonial charm, and pleasant climate.',
    image: '/Ooty.jpeg',
    packages: [
      {
        id: 'ooty-1',
        title: 'Ooty Weekend Getaway',
        duration: '2 Days / 1 Night',
        highlights: ['Tea Garden Visit', 'Lake Boating', 'Botanical Garden', 'Nilgiri Mountain Railway'],
        price: '₹8,500'
      },
      {
        id: 'ooty-2',
        title: 'Ooty Family Package',
        duration: '3 Days / 2 Nights',
        highlights: ['Dolphin\'s Nose', 'Pykara Lake', 'Rose Garden', 'Local Sightseeing'],
        price: '₹15,000'
      }
    ]
  },
  {
    id: 'munnar',
    name: 'Munnar',
    description: 'A picturesque hill station famous for its tea plantations, misty mountains, and exotic flora.',
    image: '/Munnar.jpg',
    packages: [
      {
        id: 'munnar-1',
        title: 'Munnar Tea Garden Tour',
        duration: '2 Days / 1 Night',
        highlights: ['Tea Museum', 'Mattupetty Dam', 'Echo Point', 'Eravikulam National Park'],
        price: '₹10,000'
      },
      {
        id: 'munnar-2',
        title: 'Munnar Honeymoon Special',
        duration: '3 Days / 2 Nights',
        highlights: ['Sunrise at Lockhart Gap', 'Tea Gardens', 'Spice Plantation', 'Couple Activities'],
        price: '₹18,500'
      }
    ]
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    description: 'The Princess of Hill Stations, offering serene lakes, waterfalls, and dense forests.',
    image: '/Kodaikanal.jpg',
    packages: [
      {
        id: 'kodaikanal-1',
        title: 'Kodaikanal Lake Adventure',
        duration: '2 Days / 1 Night',
        highlights: ['Boating', 'Coaker\'s Walk', 'Bryant Park', 'Silver Cascade Falls'],
        price: '₹9,000'
      },
      {
        id: 'kodaikanal-2',
        title: 'Kodaikanal Nature Retreat',
        duration: '3 Days / 2 Nights',
        highlights: ['Pine Forest Trek', 'Berijam Lake', 'Thalaiyar Falls', 'Star Gazing'],
        price: '₹16,000'
      }
    ]
  },
  {
    id: 'coorg',
    name: 'Coorg',
    description: 'The Scotland of India, known for its coffee plantations, spice estates, and lush greenery.',
    image: '/Coorg.jpg',
    packages: [
      {
        id: 'coorg-1',
        title: 'Coorg Coffee Plantation Tour',
        duration: '2 Days / 1 Night',
        highlights: ['Coffee Estate Visit', 'Abbey Falls', 'Raja\'s Seat', 'Dubare Elephant Camp'],
        price: '₹11,000'
      },
      {
        id: 'coorg-2',
        title: 'Coorg Wildlife Adventure',
        duration: '3 Days / 2 Nights',
        highlights: ['Nagarhole Safari', 'Iruppu Falls', 'Kushalnagar', 'Tibetan Monastery'],
        price: '₹17,500'
      }
    ]
  }
];

export const getDestination = (id) => {
  return destinations.find(dest => dest.id === id);
};

export const getPackage = (destinationId, packageId) => {
  const destination = getDestination(destinationId);
  if (!destination) return null;
  return destination.packages.find(pkg => pkg.id === packageId);
};
