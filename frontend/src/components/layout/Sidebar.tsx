import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { MdOutlineFace, MdQueryStats } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { LuHome } from "react-icons/lu";
import { PagePaths } from "@/pages/PagePaths";

export function Sidebar() {
  const iconSize = 20;

  return (
    <div className={"h-full border border-r-border flex flex-col gap-4 p-2"}>
      <NavigationItem path={PagePaths.home} icon={<LuHome size={iconSize} />} />
      <NavigationItem
        path={PagePaths.shelf}
        icon={<GiBookshelf size={iconSize} />}
      />
      <NavigationItem
        path={PagePaths.statistics}
        icon={<MdQueryStats size={iconSize} />}
      />
      <NavigationItem
        path={PagePaths.me}
        icon={<MdOutlineFace size={iconSize} />}
      />
    </div>
  );
}

function NavigationItem({ path, icon }: { path: string; icon: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPage = location.pathname === path;

  return (
    <Button
      variant={isCurrentPage ? "secondary" : "ghost"}
      size="icon"
      onClick={() => navigate(path)}
    >
      {icon}
    </Button>
  );
}
