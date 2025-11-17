import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-11 py-4">{children}</main>
      </div>
    </div>
  );
}
