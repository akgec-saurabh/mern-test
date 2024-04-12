import Link from "next/link";
import React from "react";

const TopBar = () => {
  return (
    <div className="container flex h-[36px] items-center justify-end gap-4 ">
      <Link
        href="#"
        className="text-xs hover:underline hover:underline-offset-2"
      >
        Help
      </Link>
      <Link
        href="#"
        className="text-xs hover:underline hover:underline-offset-2"
      >
        Orders & Returns
      </Link>
      <Link
        href="#"
        className="text-xs hover:underline hover:underline-offset-2"
      >
        Hi, John
      </Link>
    </div>
  );
};

export default TopBar;
