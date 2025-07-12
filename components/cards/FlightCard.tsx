import React from "react";
import Image from "next/image";
import Dots from "/assets/dots.svg";
import IconAirplane from "/assets/icon-airplane.svg";
import ChevronRight from "/assets/chevron-right.svg";
import Airplane from "/assets/airplane.svg";

interface FlightCardProps {
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate?: string; // For flights that arrive next day
  duration: string;
  direct: boolean;
  flightNumber: string;
  airline?: string;
  status: "Departed" | "Arrived" | "On Time" | "Delayed" | "Cancelled";
  price?: number;
  currency?: string;
  stops?: number;
  onDetailsClick: (flightNumber: string, status: string) => void;
  className?: string;
}

const FlightCard: React.FC<FlightCardProps> = ({
  departureTime,
  arrivalTime,
  origin,
  destination,
  departureDate,
  arrivalDate,
  duration,
  direct,
  flightNumber,
  airline,
  status,
  price,
  currency = "IDR",
  stops = 0,
  onDetailsClick,
  className = ""
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Time":
        return "text-green-600 bg-green-50";
      case "Departed":
        return "text-blue-600 bg-blue-50";
      case "Arrived":
        return "text-purple-600 bg-purple-50";
      case "Delayed":
        return "text-orange-600 bg-orange-50";
      case "Cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const FlightRoute = () => (
    <div className="flex flex-col items-center justify-center px-4">
      <p className="text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] mb-2">
        {duration}
      </p>
      
      <div className="flex items-center justify-center gap-2 mb-2">
        <Image src={Dots} alt="Departure" width={16} height={16} />
        <div className="w-16 lg:w-20 h-0.5 border-t-2 border-dashed border-gray-300" />
        <div className="relative">
          <Image 
            src={IconAirplane} 
            alt="Flight path" 
            width={20} 
            height={20}
            className="text-primary"
          />
        </div>
        <div className="w-16 lg:w-20 h-0.5 border-t-2 border-dashed border-gray-300" />
        <Image src={Dots} alt="Arrival" width={16} height={16} />
      </div>
      
      <p className="text-slate-600 text-sm font-medium font-['Plus Jakarta Sans']">
        {direct ? "Direct" : `${stops} stop${stops > 1 ? 's' : ''}`}
      </p>
    </div>
  );

  return (
    <div className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="flex">
        {/* Flight Information Section */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex justify-between items-start mb-4">
            {/* Departure Info */}
            <div className="flex flex-col">
              <p className="text-2xl lg:text-3xl font-bold font-['Plus Jakarta Sans'] text-gray-900">
                {departureTime}
              </p>
              <p className="text-primary text-lg lg:text-xl font-semibold font-['Plus Jakarta Sans']">
                {origin}
              </p>
              <p className="text-gray-500 text-sm font-medium font-['Plus Jakarta Sans']">
                {departureDate}
              </p>
            </div>

            {/* Flight Route Visualization */}
            <FlightRoute />

            {/* Arrival Info */}
            <div className="flex flex-col items-end">
              <p className="text-2xl lg:text-3xl font-bold font-['Plus Jakarta Sans'] text-gray-900">
                {arrivalTime}
              </p>
              <p className="text-primary text-lg lg:text-xl font-semibold font-['Plus Jakarta Sans']">
                {destination}
              </p>
              <p className="text-gray-500 text-sm font-medium font-['Plus Jakarta Sans']">
                {arrivalDate || departureDate}
              </p>
              {arrivalDate && arrivalDate !== departureDate && (
                <span className="text-xs text-orange-500 font-medium">+1 day</span>
              )}
            </div>
          </div>

          {/* Status and Additional Info */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                {status}
              </span>
              {airline && (
                <span className="text-sm text-gray-600 font-medium">
                  {airline}
                </span>
              )}
            </div>
            
            {price && (
              <div className="text-right">
                <p className="text-sm text-gray-500">From</p>
                <p className="text-lg font-bold text-primary">
                  {formatPrice(price)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Section */}
        <div className="bg-gray-50 flex flex-col justify-center items-center px-4 lg:px-6 py-6 min-w-[120px] border-l border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-primary rounded-full p-2">
              <Image
                src={Airplane}
                alt="Flight"
                width={20}
                height={20}
                className="text-white"
              />
            </div>
            <div className="text-center">
              <p className="text-sm lg:text-base font-semibold font-['Plus Jakarta Sans'] text-gray-900">
                {flightNumber}
              </p>
            </div>
          </div>
          
          <button
            className="flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm lg:text-base transition-colors duration-200 group"
            onClick={() => onDetailsClick(flightNumber, status)}
          >
            Details
            <Image
              src={ChevronRight}
              alt="View details"
              width={16}
              height={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;