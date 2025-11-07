// src/components/AppProvider.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";

// Example context – replace with whatever you actually need
type AppContextType = {
  // e.g. theme, user, etc.
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
  const value: AppContextType = {
    // put your shared state here
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Optional hook if you need to read it elsewhere
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
