import React from "react";
import { CaretLeft, CaretRight } from "./icons";

const BottomBar = () => {
  return (
    <div className="bg-gray flex  h-[36px]  w-full items-center">
      <div className="container flex w-full items-center justify-center gap-4 text-sm">
        <CaretLeft />
        <p>Get 10% off on business sign up</p>
        <CaretRight />
      </div>
    </div>
  );
};

export default BottomBar;
