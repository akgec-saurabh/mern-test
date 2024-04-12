import React from "react";
import Header from "../_components/header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
    </React.Fragment>
  );
};

export default HomeLayout;
