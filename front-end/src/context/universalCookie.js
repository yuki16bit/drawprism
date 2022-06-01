import { createContext } from 'react';
import Cookies from 'universal-cookie';
export const cookies = new Cookies();
export const CookieContext = createContext();
