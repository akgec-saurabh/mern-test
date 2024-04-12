import React from "react";
import Logo from "./logo";
import Link from "next/link";
import Button from "./ui/button";
import { CartIcon, SearchIcon } from "./icons";
import TopBar from "./top-bar";
import BottomBar from "./bottom-bar";

const menu = [
  { label: "Categories", value: "categories", href: "#" },
  { label: "Sale", value: "sale", href: "#" },
  { label: "Clearance", value: "clearance", href: "#" },
  { label: "New Stock", value: " new-stock", href: "#" },
  { label: "Trending", value: "trending", href: "#" },
];
const Header = () => {
  return (
    <header className="">
      <TopBar />
      <div className="container relative flex w-full justify-between">
        <Logo />
        <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-4">
          {menu.map((item) => (
            <Link
              className="font-semibold hover:underline hover:underline-offset-2"
              href={item.href}
              key={item.value}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="icon">
            <SearchIcon />
          </Button>
          <Button variant="icon">
            <CartIcon />
          </Button>
        </div>
      </div>
      <BottomBar />
    </header>
  );
};

export default Header;
