export interface User {
    id: string;
    name: string;
    email: string;
    role: 'guest' | 'user' | 'admin';
    image?: string;
  }
  
  export interface Flight {
    id: string;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    duration: string;
    aircraft: string;
    class: 'Economy' | 'Business' | 'First';
    availableSeats: number;
  }
  
  export interface Route {
    id: string;
    origin: string;
    destination: string;
    popular: boolean;
  }
  
  export interface Passenger {
    title: 'Mr' | 'Mrs' | 'Ms';
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    seatNumber?: string;
  }
  
  export interface Booking {
    id: string;
    userId: string;
    flightId: string;
    flight: Flight;
    passengers: Passenger[];
    totalPrice: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    bookingReference: string;
    createdAt: string;
  }