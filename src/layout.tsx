import React from "react";
import Navbar from "./components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  );
}
