import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={"h-[100vh] w-[100vw] bg-background flex"}>
      <Sidebar />
      <main className={"flex-1 h-full"}>{children}</main>
    </div>
  );
}
