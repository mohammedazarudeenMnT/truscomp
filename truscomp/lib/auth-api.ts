import { axiosInstance } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  image?: string;
  banned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    session: any;
  };
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/api/auth/sign-in/email", { 
    email, 
    password 
  });
  return {
    success: true,
    data: response.data
  };
};

export const logout = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/api/auth/sign-out");
  return {
    success: true,
    data: response.data
  };
};

export const getSession = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get("/api/auth/get-session");
  return {
    success: true,
    data: response.data
  };
};
