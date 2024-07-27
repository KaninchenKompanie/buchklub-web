import { useAuth } from "@/modules/auth/components/AuthContext";
import { PagePaths } from "@/pages/PagePaths";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateElement = ({ children }: { children: ReactNode }) => {
  const user = useAuth();
  if (!user.token) return <Navigate to={PagePaths.login} />;

  return children;
};

export default PrivateElement;
