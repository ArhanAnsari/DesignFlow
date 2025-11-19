import Image from "next/image";
import React from "react";

const Companies = () => {
  return (
    <div
      className="flex flex-col py-16 items-center justify-center text-center font-space gap-9"
      id="partners"
    >
      <p className="font-medium text-2xl">
        Trusted by over 14,540 businesses to enhance learning and drive
        educational growth.
      </p>
      <div className="flex flex-row">
        <Image src="/image 1.png" alt="" width={126} height={42} />
        <Image src="/image 2.png" alt="" width={126} height={42} />
        <Image src="/image 3.png" alt="" width={126} height={42} />
        <Image src="/image 4.png" alt="" width={126} height={42} />
        <Image src="/image 5.png" alt="" width={126} height={42} />
        <Image src="/image 6.png" alt="" width={126} height={42} />
      </div>
    </div>
  );
};

export default Companies;
