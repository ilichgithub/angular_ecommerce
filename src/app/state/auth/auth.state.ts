
export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userEmail: string | null;
  error: string | null;
  isLoading: boolean;
}

// Estado inicial
export const initialAuthState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  userEmail: null,
  error: null,
  isLoading: false,
};