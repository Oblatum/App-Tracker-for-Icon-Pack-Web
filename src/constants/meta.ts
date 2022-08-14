export const APP_NAME = (window as any).__APP_ENV__.name;
export const APP_VERSION = (window as any).__APP_ENV__.version;
export const APP_ENV = import.meta.env.MODE;
export const API_URL = import.meta.env.VITE_APP_API_URL;
