import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { LuHome } from "react-icons/lu";
import { GiBookshelf } from "react-icons/gi";
import { MdQueryStats } from "react-icons/md";
import { ReactNode } from "react";
import { PagePaths } from "@/pages/PagePaths";

export default function Layout({ children }: { children: ReactNode }) {
  const iconSize = 20;

  return (
    <div className={"h-[100vh] w-[100vw] bg-background flex"}>
      <div className={"h-full border border-r-border flex flex-col gap-4 p-2"}>
        <NavigationItem
          path={PagePaths.home}
          icon={<LuHome size={iconSize} />}
        />
        <NavigationItem
          path={PagePaths.shelf}
          icon={<GiBookshelf size={iconSize} />}
        />
        <NavigationItem
          path={PagePaths.statistics}
          icon={<MdQueryStats size={iconSize} />}
        />
      </div>
      <main className={"flex-1 h-full"}>{children}</main>
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
