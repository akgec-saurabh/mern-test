import { cn } from "lib/utils";
import React from "react";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  heading: string;
}
const Card: React.FC<CardProps> = ({
  className,
  children,
  heading,
  ...props
}) => {
  return (
    <div
      className={cn(
        "ring-border w-full max-w-xl rounded-md  px-[60px] ring-1",
        className,
      )}
      {...props}
    >
      <h1 className="mt-8 text-center text-xl font-semibold">{heading}</h1>
      {children}
    </div>
  );
};

export default Card;
