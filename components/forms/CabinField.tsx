import React, { useEffect, useState } from "react";
import { Radio, RadioChangeEvent } from "antd";

interface CabinProps {
  chosen: number;
  onChange: (value: number) => void;
}

type CabinClass = {
  value: number;
  label: string;
  description: string;
  features: string[];
};

const cabinClasses: CabinClass[] = [
  {
    value: 0,
    label: "Economy",
    description: "Comfortable and affordable",
    features: ["Standard seat", "In-flight entertainment", "Meal service"]
  },
  {
    value: 1,
    label: "Business",
    description: "Enhanced comfort and service",
    features: ["Lie-flat seat", "Premium dining", "Priority boarding"]
  },
  {
    value: 2,
    label: "First",
    description: "Ultimate luxury experience",
    features: ["Private suite", "Gourmet cuisine", "Personal service"]
  }
];

const CabinField: React.FC<CabinProps> = ({ chosen, onChange }) => {
  const [value, setValue] = useState<number>(chosen);

  // Sync with external changes
  useEffect(() => {
    setValue(chosen);
  }, [chosen]);

  const handleChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  const handleOptionClick = (optionValue: number) => {
    setValue(optionValue);
    onChange(optionValue);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="text-primary text-2xl font-bold font-['Plus Jakarta Sans'] leading-9 mb-6">
        Cabin Class
      </div>
      
      <Radio.Group 
        value={value} 
        onChange={handleChange}
        className="w-full"
      >
        <div className="space-y-3">
          {cabinClasses.map((cabin) => (
            <div
              key={cabin.value}
              className={`
                w-full p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md
                ${value === cabin.value 
                  ? 'border-primary bg-primary/5 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => handleOptionClick(cabin.value)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className={`
                        text-lg font-semibold font-['Plus Jakarta Sans'] leading-7 transition-colors
                        ${value === cabin.value ? 'text-primary' : 'text-neutral-900'}
                      `}>
                        {cabin.label}
                      </div>
                      <div className="text-neutral-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                        {cabin.description}
                      </div>
                    </div>
                  </div>
                  
                  {/* Features - show when selected */}
                  {value === cabin.value && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs text-neutral-500 mb-2 font-medium">
                        INCLUDES:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cabin.features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            ✓ {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <Radio 
                  value={cabin.value}
                  className="ml-4"
                />
              </div>
            </div>
          ))}
        </div>
      </Radio.Group>
      
      {/* Price Info (Optional) */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-neutral-700 text-sm font-medium">
          {value === 0 && "💰 Best value for budget travelers"}
          {value === 1 && "✨ Perfect balance of comfort and price"}
          {value === 2 && "👑 Premium experience with exclusive perks"}
        </div>
      </div>
    </div>
  );
};

export default CabinField;