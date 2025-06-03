import React from "react";
import backgroundImage from "@/assets/images/bg_2.jpg";

interface LayoutProps {
  children: Readonly<React.ReactNode>;
}

export default function LoginLayout({ children }: LayoutProps) {
  return (
    <div>
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage?.src})` }}
      >
        <div className="mx-auto flex h-screen w-1/4 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
