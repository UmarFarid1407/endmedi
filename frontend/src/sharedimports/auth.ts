import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  email: string;
  role: string;
}

export const decodeToken = (decode: boolean = true): DecodedToken | string | null => {
  try {
    
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('No token found in localStorage');
      return null;
    }

    
    if (decode) {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded;
    } else {
      
      return token;
    }
  } catch (error) {
    console.error('Error decoding the token:', error);
    throw new Error('Invalid token');
  }
};
