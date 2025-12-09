import React from "react";
import ClientCard from "@/components/ClientCard";
import { ClientDialog } from "@/components/ClientDialog";
import { getClients } from "@/lib/actions/appwrite.action";
import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  // Get session from cookies
  const sessionCookie = (await cookies()).get("session");

  if (!sessionCookie) {
    redirect("/sign-in");
  }

  // Create authenticated session client
  const { account } = await createSessionClient(sessionCookie.value);

  try {
    const user = await account.get();
    const clients = await getClients({ userId: user.$id });
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
          <ClientDialog userId={user.$id} />
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
  } catch (error) {
    console.error("Authentication error:", error);
    redirect("/sign-in");
  }
};

export default page;
