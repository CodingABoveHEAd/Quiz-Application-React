import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({ element }) {
  const { currentUser } = useAuth();

  return !currentUser ? element : <Navigate to="/" replace />;
}
