// src/components/ClientWrapper.tsx
"use client";

import AppProvider from "./AppProvider";
import { ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
