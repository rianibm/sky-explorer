import React from "react";
import Image from "next/image";

interface LogoImageProps {
  size?: "small" | "medium" | "large";
  className?: string;
  alt?: string;
}

const LogoImage: React.FC<LogoImageProps> = ({ 
  size = "medium", 
  className = "",
  alt = "Sky Explorer Logo"
}) => {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case "small":
        return "w-8 h-8 p-1.5";
      case "large":
        return "w-16 h-16 p-3";
      case "medium":
      default:
        return "w-12 h-12 p-2.5";
    }
  };

  const getImageSize = (size: string) => {
    switch (size) {
      case "small":
        return { width: 20, height: 20 };
      case "large":
        return { width: 40, height: 40 };
      case "medium":
      default:
        return { width: 28, height: 28 };
    }
  };

  const sizeClasses = getSizeClasses(size);
  const imageSize = getImageSize(size);

  return (
    <div className={`bg-primary rounded-full flex items-center justify-center ${sizeClasses} ${className}`.trim()}>
      <Image 
        src="/assets/airplane.svg" 
        alt={alt}
        width={imageSize.width}
        height={imageSize.height}
        className="text-white"
        priority
      />
    </div>
  );
};

export default LogoImage;