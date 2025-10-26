import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Loading from "@/components/common/Loading";
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  // login: (userData: { email: string; userName: string }) => void;
  logout: () => void;
  isLoading:boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// AuthProvider to manage auth state
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading,setIsLoading] = useState<boolean>(true);

  // const navigate = useNavigate(); 
  const login = () => {
    setIsAuthenticated(true);
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      console.log(user)
      setIsAuthenticated(true);
    }
    setIsLoading(false)
  }, []);

  const logout = () => {
    localStorage.removeItem("user"); 
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected route to guard private components
interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated , isLoading} = useAuth();
  if (isLoading) {
    return <Loading />;
  }
  return   isAuthenticated ? <> {children} </> : <Navigate to="/" replace />;
};
