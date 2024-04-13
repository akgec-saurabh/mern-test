import { cn } from "lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "icon" | "lg";
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
    lg: "h-[56px] px-4 py-2 rounded-md uppercase bg-black text-white font-medium",
  };
  return (
    <button
      className={cn(
        "hover:bg-current/80 rounded",
        ButtonVariant[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
