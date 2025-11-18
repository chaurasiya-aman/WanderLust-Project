const sampleListings = [
  {
    title: 'Cozy Mountain Cabin',
    description: 'A peaceful cabin nestled in the heart of the mountains. Perfect for nature lovers and hikers.',
    image: {
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      filename: 'CozyMountainCabin'
    },
    price: 120,
    location: 'Aspen',
    country: 'United States',
    category: ['mountains', 'camping']
  },
  {
    title: 'Modern Apartment in City Center',
    description: 'Spacious apartment with a skyline view, close to all major attractions and restaurants.',
    image: {
      url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      filename: 'ModernApartmentCityCenter'
    },
    price: 180,
    location: 'New York',
    country: 'United States',
    category: ['rooms']
  },
  {
    title: 'Beachfront Villa',
    description: 'Enjoy sunrise views and private beach access in this luxurious villa.',
    image: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      filename: 'BeachfrontVilla'
    },
    price: 350,
    location: 'Bali',
    country: 'Indonesia',
    category: ['beach', 'pools']
  },
  {
    title: 'Rustic Countryside Cottage',
    description: 'Charming cottage surrounded by green fields and serene landscapes.',
    image: {
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      filename: 'RusticCountrysideCottage'
    },
    price: 90,
    location: 'Cotswolds',
    country: 'United Kingdom',
    category: ['farms']
  },
  {
    title: 'Urban Studio Apartment',
    description: 'Compact yet cozy studio apartment located near public transport.',
    image: {
      url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
      filename: 'UrbanStudioApartment'
    },
    price: 70,
    location: 'Berlin',
    country: 'Germany',
    category: ['rooms']
  },
  {
    title: 'Desert Glamping Tent',
    description: 'Luxury camping in the desert dunes with starry night views.',
    image: {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      filename: 'DesertGlampingTent'
    },
    price: 130,
    location: 'Dubai',
    country: 'UAE',
    category: ['camping']
  },
  {
    title: 'Historic Castle Room',
    description: 'Stay like royalty in this renovated medieval castle with modern comforts.',
    image: {
      url: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&w=800&q=80',
      filename: 'HistoricCastleRoom'
    },
    price: 400,
    location: 'Edinburgh',
    country: 'Scotland',
    category: ['rooms']
  },
  {
    title: 'Snowy Cabin Retreat',
    description: 'Warm wooden interiors and a fireplace make this cabin ideal for winter getaways.',
    image: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      filename: 'SnowyCabinRetreat'
    },
    price: 160,
    location: 'Zermatt',
    country: 'Switzerland',
    category: ['snowy', 'mountains', 'camping']
  },
  {
    title: 'Lakeview Retreat',
    description: 'Relax by the lake in this quiet and scenic retreat. Ideal for couples and families.',
    image: {
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      filename: 'LakeviewRetreat'
    },
    price: 150,
    location: 'Ontario',
    country: 'Canada',
    category: ['boats']
  },
  {
    title: 'Tropical Treehouse',
    description: 'Experience the rainforest like never before with this elevated treehouse stay.',
    image: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      filename: 'TropicalTreehouse'
    },
    price: 200,
    location: 'Chiang Mai',
    country: 'Thailand',
    category: ['camping']
  },
  {
    title: 'New Villa',
    description: 'The Luxurious Villa',
    image: {
      url: 'https://res.cloudinary.com/droxa8y8g/image/upload/v1762309444/wanderlust_DEV/gqjafhmyewhgcxn1uytu.webp',
      filename: 'wanderlust_DEV/gqjafhmyewhgcxn1uytu'
    },
    price: 12340,
    location: 'London',
    country: 'United Kingdom',
    category: ['farms', 'rooms']
  },
  {
    title: 'The Mountain',
    description: 'Peaceful place',
    image: {
      url: 'https://res.cloudinary.com/droxa8y8g/image/upload/v1762306560/wanderlust_DEV/ypr368lq0skqm4ltffnv.jpg',
      filename: 'wanderlust_DEV/ypr368lq0skqm4ltffnv'
    },
    price: 123,
    location: 'Lucknow',
    country: 'India',
    category: ['mountains']
  },
  {
    title: '12w23',
    description: '32123',
    image: {
      url: 'https://res.cloudinary.com/droxa8y8g/image/upload/v1762400393/wanderlust_DEV/lhrvndsybgfktghgcowk.webp',
      filename: 'wanderlust_DEV/lhrvndsybgfktghgcowk'
    },
    price: 123,
    location: '123',
    country: '2312',
    category: ['rooms']
  }
];

module.exports = { data: sampleListings };
