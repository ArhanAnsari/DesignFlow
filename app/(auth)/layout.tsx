import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[url('/bg-llustration.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
