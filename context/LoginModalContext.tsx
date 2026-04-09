"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoginModalContextType {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  setLoginOpen: (value: boolean) => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export const LoginModalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const setLoginOpen = (value: boolean) => setIsLoginOpen(value);

  return (
    <LoginModalContext.Provider value={{ isLoginOpen, openLogin, closeLogin, setLoginOpen }}>
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginModalContext);
  if (!context) throw new Error("useLogin must be used within LoginProvider");
  return context;
};