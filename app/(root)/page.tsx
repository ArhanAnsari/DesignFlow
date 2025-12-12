import { getUser, getClients } from "@/lib/actions/appwrite.action";
import {
  Building2,
  Users,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Client {
  $id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  note: string;
  createdAt: string;
  userId: string;
}

export default async function Home() {
  const user = await getUser();
  const clientsData = await getClients({ userId: user?.data?.$id || "" });

  // Calculate real statistics from client data
  const clients = (clientsData.data as Client[] | undefined) || [];
  const totalClients = clients.length;
  const uniqueCompanies = new Set(clients.map((c) => c.company)).size;

  const stats = [
    {
      title: "Total Clients",
      value: totalClients.toString(),
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Companies",
      value: uniqueCompanies.toString(),
      icon: Building2,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const quickActions = [
    { title: "Add Client", href: "/clients", icon: Users },
    { title: "Generate Lead", href: "/leads", icon: TrendingUp },
    // { title: "Schedule Meeting", href: "#", icon: Calendar },
    // { title: "Send Email", href: "#", icon: Mail },
  ];

  // Get the 4 most recent clients sorted by creation date
  const recentClients =
    (clientsData.data as Client[] | undefined)
      ?.sort(
        (a: Client, b: Client) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4) || [];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Welcome Back, {user.data?.name}
        </h1>
        <p className="text-muted-foreground text-lg">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="relative overflow-hidden border-2 border-[#313131] rounded-xl p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:border-[#414141] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.title}
                  </p>
                  <h3 className="text-4xl font-bold">{stat.value}</h3>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}
              />
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Clients */}
        <div className="lg:col-span-2 border-2 border-[#313131] rounded-xl p-6 bg-[#0a0a0a]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Newest Clients</h2>
          </div>
          <div className="flex flex-col gap-4">
            {recentClients.length > 0 ? (
              recentClients.map((client: Client) => (
                <div
                  key={client.$id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#131313] hover:bg-[#1a1a1a] transition-colors border border-[#252525]"
                >
                  <div className="p-2 rounded-lg bg-[#252525]">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base">{client.name}</h4>
                    <div className="flex flex-col gap-1 mt-1">
                      <p className="text-muted-foreground text-sm flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {client.company}
                      </p>
                      <p className="text-muted-foreground text-sm flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {client.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No clients yet. Add your first client to get started!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-2 border-[#313131] rounded-xl p-6 bg-[#0a0a0a]">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  href={action.href}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[#131313] hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#252525] transition-all duration-300 border border-[#252525] hover:border-[#414141] group"
                >
                  <div className="p-2 rounded-lg bg-[#252525] group-hover:bg-[#313131] transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-medium group-hover:text-white transition-colors">
                    {action.title}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
