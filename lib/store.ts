import { create } from 'zustand';
import { Flight, Route } from '@/types'; // Remove unused Booking

interface PassengerDetail {
  title: 'Mr' | 'Mrs' | 'Ms';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AppState {
  // Flight search
  searchParams: {
    from: string;
    to: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    class: 'Economy' | 'Business' | 'First';
    isRoundTrip: boolean;
  };
  
  // Results
  outboundFlights: Flight[];
  returnFlights: Flight[];
  selectedOutbound: Flight | null;
  selectedReturn: Flight | null;
  
  // Popular routes
  popularRoutes: Route[];
  
  // Booking process
  bookingStep: 'search' | 'select' | 'passenger' | 'payment' | 'confirmation';
  passengerDetails: PassengerDetail[]; // Fix: specific type instead of any[]
  
  // Actions
  setSearchParams: (params: Partial<AppState['searchParams']>) => void;
  setOutboundFlights: (flights: Flight[]) => void;
  setReturnFlights: (flights: Flight[]) => void;
  setSelectedOutbound: (flight: Flight | null) => void;
  setSelectedReturn: (flight: Flight | null) => void;
  setBookingStep: (step: AppState['bookingStep']) => void;
  setPassengerDetails: (details: PassengerDetail[]) => void;
  resetBooking: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchParams: {
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'Economy',
    isRoundTrip: false
  },
  
  outboundFlights: [],
  returnFlights: [],
  selectedOutbound: null,
  selectedReturn: null,
  popularRoutes: [],
  bookingStep: 'search',
  passengerDetails: [],
  
  setSearchParams: (params) => set((state) => ({
    searchParams: { ...state.searchParams, ...params }
  })),
  
  setOutboundFlights: (flights) => set({ outboundFlights: flights }),
  setReturnFlights: (flights) => set({ returnFlights: flights }),
  setSelectedOutbound: (flight) => set({ selectedOutbound: flight }),
  setSelectedReturn: (flight) => set({ selectedReturn: flight }),
  setBookingStep: (step) => set({ bookingStep: step }),
  setPassengerDetails: (details) => set({ passengerDetails: details }),
  
  resetBooking: () => set({
    selectedOutbound: null,
    selectedReturn: null,
    bookingStep: 'search',
    passengerDetails: []
  })
}));