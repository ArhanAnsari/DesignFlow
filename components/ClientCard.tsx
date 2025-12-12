import { Building2, LocateFixed, Mail, Phone } from "lucide-react";
import React from "react";

const ClientCard = ({
  name,
  email,
  phone,
  address,
  company,
  note,
}: {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  note: string;
}) => {
  return (
    <div className="flex flex-col gap-2 px-6 py-6 border-[#313131] border-2 rounded-lg">
      <h1 className="font-bold text-2xl font-space">{name}</h1>
      <div className="flex flex-row gap-2">
        <p className="text-muted-foreground flex flex-row gap-1">
          <LocateFixed />
          {address}
        </p>
        <p className="text-muted-foreground flex flex-row gap-1">
          <Building2 />
          {company}
        </p>
      </div>
      <div className="md:flex md:flex-row gap-2 grid grid-rows-2">
        <p className="text-muted-foreground flex flex-row gap-1">
          <Mail />
          {email}
        </p>
        <p className="text-muted-foreground flex flex-row gap-1">
          <Phone />
          {phone}
        </p>
      </div>
      <div className="flex flex-row px-6 py-2 bg-[#131313] rounded-lg p-2">
        <p className="text-muted-foreground ">{note}</p>
      </div>
    </div>
  );
};

export default ClientCard;
