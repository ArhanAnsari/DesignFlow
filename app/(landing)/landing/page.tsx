import Navbar from "@/components/Navbar";
import Companies from "@/components/Sections/Companies";
import HeroSection from "@/components/Sections/HeroSection";
import Stats from "@/components/Sections/Stats";
import React from "react";

const Page = () => {
  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <HeroSection />
      <Companies />
      <Stats />
    </div>
  );
};

export default Page;
