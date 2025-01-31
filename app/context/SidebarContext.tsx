"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const SidebarContext = createContext<{
  isOpen: boolean;
  toggleSidebar: () => void;
}>({
  isOpen: true,
  toggleSidebar: () => {},
});

// Provider Component
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function with localStorage update
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

// Hook for easy access
export function useSidebar() {
  return useContext(SidebarContext);
}
