import React, { useEffect, useState, useCallback } from "react";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface SeatsProps {
  seats: Map<string, number>;
  onChange: (seats: Map<string, number>) => void;
}

const PassengerField: React.FC<SeatsProps> = ({ seats, onChange }) => {
  const [adult, setAdult] = useState(seats.get("adults") ?? 1);
  const [children, setChildren] = useState(seats.get("children") ?? 0);
  const [infant, setInfant] = useState(seats.get("infant") ?? 0);

  // Memoize onChange to prevent unnecessary re-renders
  const memoizedOnChange = useCallback(onChange, [onChange]);

  // Update parent when any passenger count changes
  useEffect(() => {
    const newSeats = new Map(seats);
    newSeats.set("adults", adult);
    newSeats.set("children", children);
    newSeats.set("infant", infant);
    memoizedOnChange(newSeats);
  }, [adult, children, infant, seats, memoizedOnChange]);

  // Sync with external changes
  useEffect(() => {
    const currentAdult = seats.get("adults") ?? 1;
    const currentChildren = seats.get("children") ?? 0;
    const currentInfant = seats.get("infant") ?? 0;

    // Only update if values are different to prevent infinite loops
    if (currentAdult !== adult) setAdult(currentAdult);
    if (currentChildren !== children) setChildren(currentChildren);
    if (currentInfant !== infant) setInfant(currentInfant);
  }, [seats, adult, children, infant]);

  const handleAdultChange = useCallback((increment: boolean) => {
    const newValue = increment ? adult + 1 : Math.max(1, adult - 1); // At least 1 adult
    setAdult(newValue);
  }, [adult]);

  const handleChildrenChange = useCallback((increment: boolean) => {
    const newValue = increment ? children + 1 : Math.max(0, children - 1);
    setChildren(newValue);
  }, [children]);

  const handleInfantChange = useCallback((increment: boolean) => {
    const maxInfants = adult; // Infants cannot exceed adults
    const newValue = increment 
      ? Math.min(maxInfants, infant + 1) 
      : Math.max(0, infant - 1);
    setInfant(newValue);
  }, [adult, infant]);

  const PassengerRow = ({ 
    title, 
    subtitle, 
    count, 
    onIncrement, 
    onDecrement, 
    canDecrement = true,
    canIncrement = true 
  }: {
    title: string;
    subtitle: string;
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
    canDecrement?: boolean;
    canIncrement?: boolean;
  }) => (
    <div className="flex w-full items-center justify-between py-3">
      <div className="flex-1">
        <div className="text-lg font-semibold font-['Plus Jakarta Sans'] leading-7 text-neutral-900">
          {title}
        </div>
        <div className="text-sm font-medium font-['Plus Jakarta Sans'] leading-tight text-neutral-600">
          {subtitle}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          shape="circle"
          size="large"
          disabled={!canDecrement}
          onClick={onDecrement}
          className="flex items-center justify-center border-gray-300 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          icon={<MinusOutlined />}
        />
        <div className="w-12 text-center text-lg font-semibold font-['Plus Jakarta Sans'] leading-7 text-neutral-900">
          {count}
        </div>
        <Button
          shape="circle"
          size="large"
          disabled={!canIncrement}
          onClick={onIncrement}
          className="flex items-center justify-center border-gray-300 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          icon={<PlusOutlined />}
        />
      </div>
    </div>
  );

  const totalPassengers = adult + children + infant;

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <div className="mb-6 text-2xl font-semibold font-['Plus Jakarta Sans'] leading-9 text-primary">
        Passengers
      </div>
      
      <div className="space-y-4">
        <PassengerRow
          title="Adults"
          subtitle="12 years old and above"
          count={adult}
          onIncrement={() => handleAdultChange(true)}
          onDecrement={() => handleAdultChange(false)}
          canDecrement={adult > 1}
        />
        
        <div className="border-t border-gray-100 pt-4">
          <PassengerRow
            title="Children"
            subtitle="2-11 years old"
            count={children}
            onIncrement={() => handleChildrenChange(true)}
            onDecrement={() => handleChildrenChange(false)}
            canDecrement={children > 0}
          />
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <PassengerRow
            title="Infant"
            subtitle="Below 2 years old"
            count={infant}
            onIncrement={() => handleInfantChange(true)}
            onDecrement={() => handleInfantChange(false)}
            canDecrement={infant > 0}
            canIncrement={infant < adult}
          />
        </div>
        
        {infant >= adult && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-600">
            ⚠️ Each infant must be accompanied by an adult
          </div>
        )}
      </div>
      
      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="text-sm font-medium text-neutral-700">
          Total: {totalPassengers} passenger{totalPassengers > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default PassengerField;