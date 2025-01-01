export interface User {
    name: string;
    email: string;
    role: string;
    id:number;
  }
  
  export const fetchUser = (): User | null => {
    const userData = localStorage.getItem('user');
    
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  };
  