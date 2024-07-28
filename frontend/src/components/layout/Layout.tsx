import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={"h-[100vh] w-[100vw] bg-background flex"}>
      <Sidebar />
      {/* NOTE: temp fix: custom ml left to prevent content overflow with sidebar */}
      <main className={"flex-1 h-full ml-[53px]"}>{children}</main>
    </div>
  );
}
