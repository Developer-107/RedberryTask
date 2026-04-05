declare module "*.css";
declare module "*.scss";

export {};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}