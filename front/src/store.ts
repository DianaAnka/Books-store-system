import create from "zustand";

export interface User {
  email: string;
  isLogged: boolean;
  profilePic?: string;
  roles?: string[];
  rates?: any;
}

type Store = {
  user?: User;
  setUser: (user: User) => void;
};

const useStore = create<Store>(
  (set): Store => ({
    user: undefined,
    setUser: (user: User) =>
      set((state) => ({
        ...state,
        user,
      })),
  })
);

export default useStore;
