"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { SidebarProvider } from "./context/SidebarContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <SessionProvider>{children}</SessionProvider>
      </SidebarProvider>
    </Provider>
  );
}
