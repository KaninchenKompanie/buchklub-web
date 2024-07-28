import { useAuth } from "@/modules/auth/components/AuthContext";

export default function useCurrentUser() {
  const { user } = useAuth();

  if (!user) throw "User not found";

  return { user };
}
