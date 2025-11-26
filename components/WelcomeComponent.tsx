import auth from "@/auth";
import React from "react";

const WelcomeComponent = async () => {
  const user = await auth.getUser();
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-4 font-space">
        Welcome back, {firstName}
      </h1>
    </div>
  );
};

export default WelcomeComponent;
