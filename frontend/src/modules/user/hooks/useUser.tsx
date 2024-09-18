import { useUsers } from "./useUsers";

export default function useUser(id: number) {
  const { users } = useUsers();
  if (!users) return { user: undefined };
  return { user: users.find((user) => user.id == id) };
}
