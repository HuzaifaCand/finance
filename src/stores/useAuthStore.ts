import { create } from "zustand";

type UserType = { id: string; email: string; username: string | null } | null;

interface AuthState {
  user: UserType;
  loading: boolean;
  setUser: (user: UserType) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true, // <-- start in loading state
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
