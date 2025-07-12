import React from 'react';
import Image from 'next/image';

const HomeInfo1: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-center">
        <div className="flex flex-col lg:flex-row border-b border-gray-100 justify-between items-center gap-8 lg:gap-4 pb-8">
          {/* Step 1 - Find Journey */}
          <div className="flex flex-col items-center gap-6 max-w-sm">
            <div className="relative bg-gradient-to-b from-emerald-100 to-white rounded-2xl border border-gray-100 p-4">
              <Image 
                src="/assets/search_1.svg" 
                alt="Search flights icon"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <h3 className="text-neutral-900 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">
                Find Your Journey in a Flash
              </h3>
              <p className="text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal max-w-sm">
                Discover flights that suit your plans. Start your adventure with
                a simple search.
              </p>
            </div>
          </div>

          {/* Step 2 - Tailor Journey */}
          <div className="flex flex-col items-center gap-6 max-w-sm">
            <div className="relative bg-gradient-to-b from-emerald-100 to-white rounded-2xl border border-gray-100 p-4">
              <Image 
                src="/assets/take.svg" 
                alt="Customize journey icon"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <h3 className="text-neutral-900 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">
                Tailor Your Journey, Your Way
              </h3>
              <p className="text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal max-w-sm">
                Make it uniquely yours. Add details, select seats, and choose
                your in-flight delights.
              </p>
            </div>
          </div>

          {/* Step 3 - Smooth Boarding */}
          <div className="flex flex-col items-center gap-6 max-w-sm">
            <div className="relative bg-gradient-to-b from-emerald-100 to-white rounded-2xl border border-gray-100 p-4">
              <Image 
                src="/assets/smooth.svg" 
                alt="Smooth boarding icon"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <h3 className="text-neutral-900 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">
                Smooth Boarding Awaits You
              </h3>
              <p className="text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal max-w-sm">
                Ready for takeoff? Board with confidence using your digital
                boarding pass.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="py-12 flex justify-center">
        <Image
          src="/assets/download.svg"
          alt="Download app"
          width={200}
          height={100}
          className="max-w-full h-auto"
          priority
        />
      </div>
    </div>
  );
};

export default HomeInfo1;