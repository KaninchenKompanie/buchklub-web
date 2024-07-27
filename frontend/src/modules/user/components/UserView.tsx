import useCurrentUser from "../hooks/useCurrentUser";
import UserWelcome from "./UserWelcome";

export default function UserView() {
  //   const { user } = useCurrentUser();

  return (
    <div className="p-10">
      <UserWelcome />
      {/* stuff .... */}
    </div>
  );
}
