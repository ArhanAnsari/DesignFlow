"use client";

import Image from "next/image";
import { BackgroundRippleEffect } from "../ui/BackgroundRippleEffect";
import { Badge } from "@/components/ui/badge";

import React from "react";

const HeroSection = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden max-h-[883px] gap-32 font-space">
      <BackgroundRippleEffect />
      <div className="relative z-10 w-full">
        <div className="flex flex-col items-center justify-center">
          <Badge className="w-[259px] h-[49px] bg-white text-black text-bold font-space">
            3500+ pro users
          </Badge>
          <div className="flex flex-col gap-9">
            <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-black md:text-4xl lg:text-7xl dark:text-neutral-100">
              Simplify, Scale, Succeed with Our SaaS Solution
            </h2>
            <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-black text-2xl dark:text-neutral-500">
              Empower your custom relations by getting trusted clients, faster
              and easier
            </p>
          </div>
        </div>
      </div>
      <Image
        src="/Leads (2) 1.png"
        alt="DesignFlow leads dashboard preview"
        width={1101}
        height={806}
        className="relative z-10 w-full max-w-[1101px]"
        priority
      />
    </div>
  );
};

export default HeroSection;
