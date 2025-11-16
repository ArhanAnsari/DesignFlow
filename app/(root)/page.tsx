"use client";

import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  const firstName = user?.firstName || "User";

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-4 font-space">
        Welcome back, {firstName}
      </h1>
    </div>
  );
}
