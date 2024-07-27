import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { User, UserLogin } from "../types";
import { login } from "../api";
import {
  getAccessTokenFromStorage,
  getUserDataFromAcessToken,
  removeTokensFromStorage,
  setAccessTokenToStorage,
  setRefreshTokenToStorage,
} from "../utils";
import { toast } from "sonner";
import { PagePaths } from "@/pages/PagePaths";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isWaiting: boolean;
  handleLogin: (userLogin: UserLogin) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    // TODO remove this default value as soon as backend is finished
    getAccessTokenFromStorage() || "THIS_IS_JUST_SET_UNTIL_BACKEND_IS_SET"
  );
  const [isWaiting, setIsWaiting] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (userLogin: UserLogin) => {
    try {
      setIsWaiting(true);
      const tokenData = await login(userLogin);

      if (!tokenData) throw "Invalid token data";

      setToken(tokenData.accessToken);
      setAccessTokenToStorage(tokenData.accessToken);
      setRefreshTokenToStorage(tokenData.refreshToken);

      navigate(PagePaths.home);
    } catch (err) {
      // TODO better error message based on error
      toast.error("Sorry, something went wrong");
    } finally {
      setIsWaiting(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    removeTokensFromStorage();
    navigate(PagePaths.login);
  };

  const user = getUserDataFromAcessToken();

  return (
    <AuthContext.Provider
      value={{ token, user, handleLogin, handleLogout, isWaiting }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
