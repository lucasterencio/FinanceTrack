import { useContext, type ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const { loadingAuth, signed } = useContext(AuthContext);

  if (loadingAuth) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/"/>
  }

  return children
}
