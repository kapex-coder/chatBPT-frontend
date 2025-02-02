"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Sidebar Context
const SidebarContext = createContext<{
  isOpen: boolean;
  toggleSidebar: () => void;
}>({
  isOpen: true,
  toggleSidebar: () => {},
});

// Sidebar Provider
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      return newState;
    });
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Sidebar Hook
export function useSidebar() {
  return useContext(SidebarContext);
}
