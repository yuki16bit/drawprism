import { createContext } from 'react';
import Cookies from 'universal-cookie';
export const cookies = new Cookies();
console.log('context/cookie', cookies);
export const CookieContext = createContext();
