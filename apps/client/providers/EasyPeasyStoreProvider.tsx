"use client";
import store from "@/store/store";
import { StoreProvider } from "easy-peasy";
import React from "react";
function EasyPeasyStoreProvider({ children }: { children: React.ReactNode }) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}

export default EasyPeasyStoreProvider;
