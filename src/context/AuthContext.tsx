import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
  } from "react";
  
  import { authService } from "../services/authService";
  import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
  } from "../types/auth";
  import { tokenStorage } from "../utils/tokenStorage";
  
  interface AuthContextValue {
    isAuthenticated: boolean;
  
    login: (
      request: LoginRequest,
    ) => Promise<AuthResponse>;
  
    register: (
      request: RegisterRequest,
    ) => Promise<AuthResponse>;
  
    logout: () => Promise<void>;
  }
  
  const AuthContext =
    createContext<AuthContextValue | undefined>(
      undefined,
    );
  
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  export function AuthProvider({
    children,
  }: AuthProviderProps) {
    const [accessToken, setAccessToken] =
      useState<string | null>(
        tokenStorage.getAccessToken(),
      );
  
    async function login(
      request: LoginRequest,
    ): Promise<AuthResponse> {
      const response =
        await authService.login(request);
  
      tokenStorage.setTokens(
        response.accessToken,
        response.refreshToken,
      );
  
      setAccessToken(response.accessToken);
  
      return response;
    }
  
    async function register(
      request: RegisterRequest,
    ): Promise<AuthResponse> {
      const response =
        await authService.register(request);
  
      tokenStorage.setTokens(
        response.accessToken,
        response.refreshToken,
      );
  
      setAccessToken(response.accessToken);
  
      return response;
    }
  
    async function logout(): Promise<void> {
      const refreshToken =
        tokenStorage.getRefreshToken();
  
      try {
        if (refreshToken) {
          await authService.logout(refreshToken);
        }
      } finally {
        tokenStorage.clearTokens();
        setAccessToken(null);
      }
    }
  
    const value = useMemo<AuthContextValue>(
      () => ({
        isAuthenticated: Boolean(accessToken),
        login,
        register,
        logout,
      }),
      [accessToken],
    );
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error(
        "useAuth must be used inside AuthProvider",
      );
    }
  
    return context;
  }