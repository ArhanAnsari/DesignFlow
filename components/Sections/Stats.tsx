import React from "react";

const Stats = () => {
  return (
    <div
      className=" flex justify-center items-center py-10 font-space text-white"
      id="why-us"
    >
      <div className="max-w-[1224px] max-h-[572px] rounded-xl bg-[url('/image%207.png')] bg-cover bg-center bg-no-repeat">
        <div className="py-24 flex flex-col gap-16">
          <div className=" flex flex-col items-center justify-center">
            <h1 className="text-white text-center font-medium text-5xl">
              Empowering Growth and Innovation with Cutting-Edge Technology
              Solutions
            </h1>
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            <div className="flex flex-col text-center">
              <h1 className="font-medium text-6xl text-center">2468+</h1>
              <p className="text-2xl text-center">Pro Users</p>
            </div>
            <div className="flex flex-col text-center">
              <h1 className="font-medium text-6xl">297+</h1>
              <p className="text-2xl text-center">Customers Managed</p>
            </div>
            <div className="flex flex-col text-center">
              <h1 className="font-medium text-6xl text-center">20,000+</h1>
              <p className="text-2xl text-center">Leads Found</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
