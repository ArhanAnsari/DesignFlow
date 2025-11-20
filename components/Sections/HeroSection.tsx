"use client";

import Image from "next/image";
import { BackgroundRippleEffect } from "../ui/BackgroundRippleEffect";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-start min-h-[90vh] w-full overflow-hidden pt-24 px-4">

      <BackgroundRippleEffect />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        <Badge className="px-6 py-2 bg-white text-black font-semibold text-sm md:text-base">
          3500+ pro users
        </Badge>

        <h1 className="mt-8 font-space text-3xl md:text-5xl lg:text-7xl font-bold text-black dark:text-white leading-tight">
          Simplify, Scale, Succeed with Our SaaS Solution
        </h1>

        <p className="mt-4 max-w-xl text-lg md:text-xl text-black/70 dark:text-neutral-400">
          Empower your customer relations by getting trusted clients, faster and easier.
        </p>
      </div>

      <Image
        src="/Leads (2) 1.png"
        alt="Dashboard Preview"
        width={1101}
        height={806}
        className="relative z-10 w-full max-w-5xl mt-10 px-4"
        priority
      />

    </section>
  );
};

export default HeroSection;
