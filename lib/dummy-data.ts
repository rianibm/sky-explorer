import { Flight, Route } from '@/types';

// Sky Explorer Airways routes
export const routes: Route[] = [
  { id: '1', origin: 'Jakarta (CGK)', destination: 'Bali (DPS)', popular: true },
  { id: '2', origin: 'Jakarta (CGK)', destination: 'Yogyakarta (JOG)', popular: true },
  { id: '3', origin: 'Jakarta (CGK)', destination: 'Surabaya (MLG)', popular: false },
  { id: '4', origin: 'Bali (DPS)', destination: 'Lombok (LOP)', popular: true },
  { id: '5', origin: 'Jakarta (CGK)', destination: 'Medan (KNO)', popular: false },
  { id: '6', origin: 'Jakarta (CGK)', destination: 'Makassar (UPG)', popular: false },
];

// Sky Explorer Airways flights
export const flights: Flight[] = [
  {
    id: '1',
    flightNumber: 'SE-101',
    origin: 'Jakarta (CGK)',
    destination: 'Bali (DPS)',
    departureTime: '06:00',
    arrivalTime: '08:30',
    price: 1200000,
    duration: '2h 30m',
    aircraft: 'Boeing 737-800',
    class: 'Economy',
    availableSeats: 45
  },
  {
    id: '2',
    flightNumber: 'SE-102',
    origin: 'Jakarta (CGK)',
    destination: 'Bali (DPS)',
    departureTime: '08:30',
    arrivalTime: '11:00',
    price: 1800000,
    duration: '2h 30m',
    aircraft: 'Airbus A320',
    class: 'Business',
    availableSeats: 12
  },
  {
    id: '3',
    flightNumber: 'SE-201',
    origin: 'Jakarta (CGK)',
    destination: 'Yogyakarta (JOG)',
    departureTime: '14:00',
    arrivalTime: '15:15',
    price: 750000,
    duration: '1h 15m',
    aircraft: 'Boeing 737-800',
    class: 'Economy',
    availableSeats: 60
  },
  {
    id: '4',
    flightNumber: 'SE-301',
    origin: 'Bali (DPS)',
    destination: 'Jakarta (CGK)',
    departureTime: '16:00',
    arrivalTime: '18:30',
    price: 1300000,
    duration: '2h 30m',
    aircraft: 'Boeing 737-800',
    class: 'Economy',
    availableSeats: 30
  },
  {
    id: '5',
    flightNumber: 'SE-401',
    origin: 'Jakarta (CGK)',
    destination: 'Medan (KNO)',
    departureTime: '09:00',
    arrivalTime: '11:30',
    price: 1100000,
    duration: '2h 30m',
    aircraft: 'Airbus A320',
    class: 'Economy',
    availableSeats: 50
  }
];

// Airline info
export const airlineInfo = {
  name: 'Sky Explorer Airways',
  code: 'SE',
  logo: '/images/logo/sky-explorer-logo.svg',
  slogan: 'Explore the Skies with Comfort',
  description: 'Indonesia\'s premium airline connecting major destinations across the archipelago.',
  fleet: [
    'Boeing 737-800',
    'Airbus A320',
    'Boeing 777-300ER'
  ],
  destinations: [
    'Jakarta', 'Bali', 'Yogyakarta', 'Surabaya', 
    'Medan', 'Makassar', 'Lombok', 'Batam'
  ]
};