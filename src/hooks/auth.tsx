import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { api } from "../services/api";

interface signInProps {
  email: string;
  password: string;
}

interface authResponseData {
  token: string;
  data: {
    id: number;
    name: string;
    email: string;
    isAdmin: number;
    createdAt: string;
    updated_at: string;
  };
}

interface authData {
  token: string;
  id: string;
  isAdmin: boolean;
}

export interface AuthContextData {
  signIn: ({ email, password }: signInProps) => Promise<void>;
  signOut: () => void
  user?: authData;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<authData>();

  async function signIn({ email, password }: signInProps): Promise<void> {
    try {
      const response: authResponseData = await api
        .post("/auth", { email, password })
        .then((res) => {
          console.log("Authenticated");
          return res.data;
        });

      const token = response.token;
      const user = response.data;

      let admin;
      user.isAdmin === 1 ? (admin = true) : (admin = false);

      localStorage.setItem("@FoodExplorer:token", token);
      localStorage.setItem("@FoodExplorer:id", JSON.stringify(user.id));
      localStorage.setItem("@FoodExplorer:isAdmin", JSON.stringify(admin));

      setData({ token, id: user.id.toString(), isAdmin: admin });
    } catch (error: unknown) {
      console.error(error);
      alert("Email ou senha incorretos")
    }
  }

  function signOut() {
    localStorage.removeItem("@FoodExplorer:token");
    localStorage.removeItem("@FoodExplorer:id");
    localStorage.removeItem("@FoodExplorer:isAdmin");
  }

  useEffect(() => {
    const token = localStorage.getItem("@FoodExplorer:token");
    const userId = localStorage.getItem("@FoodExplorer:id");
    const isAdmin = localStorage.getItem("@FoodExplorer:isAdmin");

    if (userId && token && isAdmin) {
      api.defaults.headers.common["Authorization"] = `bearer ${token}`;
      setData({ token, id: userId, isAdmin: JSON.parse(isAdmin) });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, user: data, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
