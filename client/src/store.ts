import create from "zustand";

export interface User {
  email: string;
  password: string;
  isLogged: boolean;
  name?: string;
  profilePic?: string;
  roles?: [string];
  rates?: Map<string, number>;
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
