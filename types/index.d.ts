export {};

declare global {
  interface Window {
    arweave: any;
    gtag: (...args: any[]) => void;
  }
}
