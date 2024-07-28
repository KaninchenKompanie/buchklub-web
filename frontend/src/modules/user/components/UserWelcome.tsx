import useCurrentUser from "../hooks/useCurrentUser";

export default function UserWelcome() {
  const { user } = useCurrentUser();

  return (
    <div className="text-4xl font-extrabold">
      Hello {user.name}, glad you're here!
    </div>
  );
}
