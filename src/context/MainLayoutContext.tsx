"use client";

import { createContext, useState } from "react";

interface MainLayoutContextProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MainLayoutContextProviderProps {
  children: Readonly<React.ReactNode>;
}

export const MainLayoutContext = createContext<MainLayoutContextProps>(
  {} as MainLayoutContextProps,
);

const MainLayoutContextProvider = ({
  children,
}: MainLayoutContextProviderProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <MainLayoutContext.Provider
      value={{ sidebarCollapsed, setSidebarCollapsed }}
    >
      {children}
    </MainLayoutContext.Provider>
  );
};

export default MainLayoutContextProvider;
