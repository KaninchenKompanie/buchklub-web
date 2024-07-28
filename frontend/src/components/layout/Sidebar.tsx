import { ComponentProps, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { MdOutlineFace, MdQueryStats } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { LuHome } from "react-icons/lu";
import { PagePaths } from "@/pages/PagePaths";
import { useAuth } from "@/modules/auth/components/AuthContext";
import { TbLogout } from "react-icons/tb";

export function Sidebar() {
  const iconSize = 20;
  const { handleLogout } = useAuth();

  return (
    <div
      className={"h-full border border-r-border flex flex-col gap-4 p-2 fixed"}
    >
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
      <NavigationItem
        className="mt-auto"
        path={PagePaths.login}
        icon={<TbLogout size={iconSize} />}
        onClick={handleLogout}
      />
    </div>
  );
}

function NavigationItem({
  path,
  icon,
  onClick,
  ...props
}: { path: string; icon: ReactNode } & ComponentProps<typeof Button>) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPage = location.pathname === path;

  const handleClick = (e: any) => {
    if (onClick) onClick(e);
    navigate(path);
  };

  return (
    <Button
      variant={isCurrentPage ? "secondary" : "ghost"}
      size="icon"
      onClick={handleClick}
      {...props}
    >
      {icon}
    </Button>
  );
}
