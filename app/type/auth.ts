export type Role = "admin" | "user";

export interface AdminUser {
    id: String;
    name : String;
    emile : String;
    role : Role;
    createdAt : String;
}


export interface loginFormData {
    email: string;
    password : string;
    remember : boolean
}

export interface loginResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface AuthState {
    user : AdminUser | null;
    isLoading :  boolean;
    isAuthenticated : boolean;
}


