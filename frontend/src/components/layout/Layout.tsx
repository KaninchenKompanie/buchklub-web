import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { LuHome } from "react-icons/lu";
import { GiBookshelf } from "react-icons/gi";
import { MdQueryStats } from "react-icons/md";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const iconSize = 20;
  return (
    <div className={"h-[100vh] w-[100vw] bg-background flex"}>
      <div className={"h-full border border-r-border flex flex-col gap-4 p-2"}>
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <LuHome size={iconSize} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate("/library")}>
          <GiBookshelf size={iconSize} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/statistics")}
        >
          <MdQueryStats size={iconSize} />
        </Button>
      </div>
      <main className={"flex-1 h-full"}>{children}</main>
    </div>
  );
}
