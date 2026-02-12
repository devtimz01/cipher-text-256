import { create } from 'zustand';

interface AuthStore {
  token: string | null,
  id: string | null
  setToken: (token: string,id:string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  id:null,
  setToken: (token: string,id:string) => set({ token,id }),
}));