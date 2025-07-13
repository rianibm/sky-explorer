// lib/store/flight-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import dayjs from 'dayjs';

export interface Airport {
  id: string;
  name: string;
  abv: string;
  city: string;
}

export interface FlightSearchState {
  // Flight search data
  airports: Airport[];
  fromAirport?: Airport;
  toAirport?: Airport;
  departureDate: dayjs.Dayjs;
  returnDate: dayjs.Dayjs;
  trip: 'one-way' | 'round';
  seat: Map<string, number>;
  cabin: number;
  
  // UI state
  isModalOpen: boolean;
  isLoading: boolean;
  
  // Actions
  setAirports: (airports: Airport[]) => void;
  setFromAirport: (airport: Airport) => void;
  setToAirport: (airport: Airport) => void;
  setDepartureDate: (date: dayjs.Dayjs) => void;
  setReturnDate: (date: dayjs.Dayjs) => void;
  setTrip: (trip: 'one-way' | 'round') => void;
  setSeat: (seat: Map<string, number>) => void;
  setCabin: (cabin: number) => void;
  setModalOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  swapAirports: () => void;
  resetSearch: () => void;
}

export const useFlightStore = create<FlightSearchState>()(
  persist(
    (set, get) => ({
      // Initial state
      airports: [],
      departureDate: dayjs(),
      returnDate: dayjs(),
      trip: 'one-way',
      seat: new Map([
        ['adults', 1],
        ['children', 0],
        ['infant', 0],
      ]),
      cabin: 0,
      isModalOpen: false,
      isLoading: false,

      // Actions
      setAirports: (airports) => set({ airports }),
      
      setFromAirport: (airport) => set({ fromAirport: airport }),
      
      setToAirport: (airport) => set({ toAirport: airport }),
      
      setDepartureDate: (date) => set({ departureDate: date }),
      
      setReturnDate: (date) => set({ returnDate: date }),
      
      setTrip: (trip) => set({ trip }),
      
      setSeat: (seat) => set({ seat }),
      
      setCabin: (cabin) => set({ cabin }),
      
      setModalOpen: (open) => set({ isModalOpen: open }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      swapAirports: () => {
        const { fromAirport, toAirport } = get();
        set({
          fromAirport: toAirport,
          toAirport: fromAirport,
        });
      },
      
      resetSearch: () => set({
        fromAirport: undefined,
        toAirport: undefined,
        departureDate: dayjs(),
        returnDate: dayjs(),
        trip: 'one-way',
        seat: new Map([
          ['adults', 1],
          ['children', 0],
          ['infant', 0],
        ]),
        cabin: 0,
      }),
    }),
    {
      name: 'flight-search-storage',
      // Only persist certain fields, not UI state
      partialize: (state) => ({
        fromAirport: state.fromAirport,
        toAirport: state.toAirport,
        trip: state.trip,
        cabin: state.cabin,
        seat: state.seat,
      }),
    }
  )
);