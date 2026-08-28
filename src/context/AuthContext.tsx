import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authService } from "../services/authService";
import { userService } from "../services/userService";

import type {
  AuthResponse,
  CurrentUser,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

import { tokenStorage } from "../utils/tokenStorage";

interface AuthContextValue {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;

  login: (
    request: LoginRequest,
  ) => Promise<AuthResponse>;

  register: (
    request: RegisterRequest,
  ) => Promise<AuthResponse>;

  logout: () => Promise<void>;

  updateCurrentUser: (
    user: CurrentUser,
  ) => void;
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

  const [user, setUser] =
    useState<CurrentUser | null>(null);

  const [isInitializing, setIsInitializing] =
    useState(true);

  useEffect(() => {
    async function initializeAuthentication() {
      const storedAccessToken =
        tokenStorage.getAccessToken();

      if (!storedAccessToken) {
        setIsInitializing(false);
        return;
      }

      try {
        const currentUser =
          await userService.getCurrentUser();

        setUser(currentUser);
        setAccessToken(storedAccessToken);
      } catch {
        tokenStorage.clearTokens();
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    }

    void initializeAuthentication();
  }, []);

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

    const currentUser =
      await userService.getCurrentUser();

    setUser(currentUser);

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

    const currentUser =
      await userService.getCurrentUser();

    setUser(currentUser);

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
      setUser(null);
    }
  }
  
  function updateCurrentUser(
    updatedUser: CurrentUser,
  ) {
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(accessToken),
        isInitializing,
        login,
        register,
        logout,
        updateCurrentUser,
      }}
    >
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