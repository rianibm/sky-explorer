import React from "react";
import { Button } from "antd";
import { ButtonProps as AntButtonProps } from "antd/lib/button";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "text" | "link" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonComponentProps extends Omit<AntButtonProps, 'type' | 'size' | 'variant'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  children: React.ReactNode;
  className?: string;
}

const getButtonClasses = (variant: ButtonVariant, size: ButtonSize, fullWidth?: boolean) => {
  const baseClasses = "font-semibold font-['Plus Jakarta Sans'] transition-all duration-200 border-0 shadow-sm hover:shadow-md";
  
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-dark text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
    text: "bg-transparent text-primary hover:bg-primary/5 shadow-none hover:shadow-none",
    link: "bg-transparent text-primary hover:text-primary-dark underline shadow-none hover:shadow-none",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm h-8",
    medium: "px-4 py-2 text-base h-10",
    large: "px-6 py-3 text-lg h-12"
  };

  const widthClasses = fullWidth ? "w-full" : "";

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses}`.trim();
};

const getAntdType = (variant: ButtonVariant): AntButtonProps['type'] => {
  switch (variant) {
    case "primary":
    case "danger":
      return "primary";
    case "outline":
      return "dashed"; // Use dashed for outline style
    case "text":
    case "link":
    case "ghost": // Map ghost to text type
      return "text";
    default:
      return "default";
  }
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = "start",
  children,
  className = "",
  disabled,
  onClick,
  ...rest
}) => {
  const buttonClasses = getButtonClasses(variant, size, fullWidth);
  const antdType = getAntdType(variant);

  return (
    <Button
      type={antdType}
      size={size === "small" ? "small" : size === "large" ? "large" : "middle"}
      loading={loading}
      disabled={disabled}
      icon={iconPosition === "start" ? icon : undefined}
      onClick={onClick}
      className={`${buttonClasses} ${className}`.trim()}
      {...rest}
    >
      <span className="flex items-center justify-center gap-2">
        {iconPosition === "start" && icon && !loading && (
          <span className="flex items-center">{icon}</span>
        )}
        <span>{children}</span>
        {iconPosition === "end" && icon && !loading && (
          <span className="flex items-center">{icon}</span>
        )}
      </span>
    </Button>
  );
};

export default ButtonComponent;