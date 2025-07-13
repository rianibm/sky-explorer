import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Logo: React.FC = () => {
  const router = useRouter();
  
  return (
    <button
      onClick={() => {
        router.push("/");
      }}
      className="flex h-[52px] items-center gap-3 transition-opacity hover:opacity-80"
    >
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute inset-0 top-0.5 h-[46px] w-[46px] rounded-full bg-primary flex items-center justify-center">
          <Image 
            src="/assets/airplane.svg" 
            alt="Airplane" 
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      </div>
      <div className="hidden text-4xl font-medium font-['Plus Jakarta Sans'] leading-[54px] text-neutral-900 md:block">
        SkyExplorer
      </div>
    </button>
  );
};

export default Logo;