import { Button } from "@/components/ui/button";
import React from "react";
import ClientCard from "@/components/ClientCard";
import { ClientDialog } from "@/components/ClientDialog";
import { getClients } from "@/lib/actions/appwrite.action";

const page = async () => {
  const clients = await getClients();
  console.log(clients);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-5xl">Clients</h1>
          <p className="text-muted-foreground">
            Manage your clients and their details.
          </p>
        </div>
        <ClientDialog />
      </div>
      <div className="flex flex-col gap-6 mt-10">
        {clients.data?.length > 0 ? (
          clients.data?.map((client) => (
            <ClientCard
              key={client.$id}
              name={client.name}
              email={client.email}
              phone={client.phone}
              address={client.address}
              company={client.company}
              note={client.note}
            />
          ))
        ) : (
          <p>No clients found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
