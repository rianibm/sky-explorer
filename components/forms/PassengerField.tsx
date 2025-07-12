import React, { useEffect, useState } from "react";
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

  // Update parent when any passenger count changes
  useEffect(() => {
    const newSeats = new Map(seats);
    newSeats.set("adults", adult);
    newSeats.set("children", children);
    newSeats.set("infant", infant);
    onChange(newSeats);
  }, [adult, children, infant, onChange]);

  // Sync with external changes
  useEffect(() => {
    setAdult(seats.get("adults") ?? 1);
    setChildren(seats.get("children") ?? 0);
    setInfant(seats.get("infant") ?? 0);
  }, [seats]);

  const handleAdultChange = (increment: boolean) => {
    const newValue = increment ? adult + 1 : Math.max(1, adult - 1); // At least 1 adult
    setAdult(newValue);
  };

  const handleChildrenChange = (increment: boolean) => {
    const newValue = increment ? children + 1 : Math.max(0, children - 1);
    setChildren(newValue);
  };

  const handleInfantChange = (increment: boolean) => {
    const maxInfants = adult; // Infants cannot exceed adults
    const newValue = increment 
      ? Math.min(maxInfants, infant + 1) 
      : Math.max(0, infant - 1);
    setInfant(newValue);
  };

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
    <div className="w-full py-3 flex justify-between items-center">
      <div className="flex-1">
        <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
          {title}
        </div>
        <div className="text-neutral-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
          {subtitle}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          shape="circle"
          size="large"
          disabled={!canDecrement}
          onClick={onDecrement}
          className="flex items-center justify-center border-gray-300 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          icon={<MinusOutlined />}
        />
        <div className="w-12 text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
          {count}
        </div>
        <Button
          shape="circle"
          size="large"
          disabled={!canIncrement}
          onClick={onIncrement}
          className="flex items-center justify-center border-gray-300 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          icon={<PlusOutlined />}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="text-primary text-2xl font-semibold font-['Plus Jakarta Sans'] leading-9 mb-6">
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
          <div className="text-amber-600 text-sm font-medium bg-amber-50 p-3 rounded-lg border border-amber-200">
            ⚠️ Each infant must be accompanied by an adult
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-neutral-700 text-sm font-medium">
          Total: {adult + children + infant} passenger{adult + children + infant > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default PassengerField;