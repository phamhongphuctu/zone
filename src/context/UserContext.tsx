import { createContext, useState } from "react";

type User = {
  username: string;
  wallet?: {
    address: string;
  };
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
