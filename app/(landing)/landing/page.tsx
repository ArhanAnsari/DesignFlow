import Navbar from "@/components/Navbar";
import Companies from "@/components/Sections/Companies";
import HeroSection from "@/components/Sections/HeroSection";
import Stats from "@/components/Sections/Stats";
import { PricingTable } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="bg-[#F6F7F9] h-screen">
      <div className="flex justify-center pb-8 pt-4">
        <Navbar />
      </div>

      <HeroSection />
      <Companies />
      <Stats />
      {/* <PricingTable /> */}
    </div>
  );
};

export default page;
