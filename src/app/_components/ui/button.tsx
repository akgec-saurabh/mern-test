import { cn } from "lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "icon";
}
const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const ButtonVariant = {
    base: "",
    default: "px-4 py-2",
    icon: "h-8 w-8 flex justify-center items-center",
  };
  return (
    <button
      className={cn("hover:bg-gray rounded", ButtonVariant[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
