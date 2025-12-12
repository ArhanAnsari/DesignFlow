import { getUser } from "@/lib/actions/appwrite.action";
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

export default async function Home() {
  // Sample data
  const stats = [
    {
      title: "Total Clients",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Leads",
      value: "18",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Companies",
      value: "15",
      change: "+5%",
      trend: "up",
      icon: Building2,
      color: "from-orange-500 to-red-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "client",
      title: "New client added",
      description: "Acme Corporation joined as a client",
      time: "2 hours ago",
      icon: Users,
    },
    {
      id: 2,
      type: "lead",
      title: "Lead converted",
      description: "TechStart Inc. converted to client",
      time: "5 hours ago",
      icon: TrendingUp,
    },
    {
      id: 3,
      type: "meeting",
      title: "Meeting scheduled",
      description: "Call with Global Solutions at 3 PM",
      time: "1 day ago",
      icon: Calendar,
    },
    {
      id: 4,
      type: "email",
      title: "Email sent",
      description: "Proposal sent to Innovation Labs",
      time: "2 days ago",
      icon: Mail,
    },
  ];

  const quickActions = [
    { title: "Add Client", href: "/clients", icon: Users },
    { title: "Generate Lead", href: "/leads", icon: TrendingUp },
    { title: "Schedule Meeting", href: "#", icon: Calendar },
    { title: "Send Email", href: "#", icon: Mail },
  ];
  const user = await getUser();

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
                  <div className="flex items-center gap-1">
                    <span className="text-green-500 text-sm font-semibold">
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      from last month
                    </span>
                  </div>
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
        {/* Recent Activity */}
        <div className="lg:col-span-2 border-2 border-[#313131] rounded-xl p-6 bg-[#0a0a0a]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#131313] hover:bg-[#1a1a1a] transition-colors border border-[#252525]"
                >
                  <div className="p-2 rounded-lg bg-[#252525]">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{activity.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              );
            })}
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

      {/* Bottom Section - Upcoming Tasks */}
      <div className="border-2 border-[#313131] rounded-xl p-6 bg-gradient-to-br from-[#0a0a0a] to-[#050505]">
        <h2 className="text-2xl font-bold mb-4">Upcoming This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[#131313] border border-[#252525]">
            <Calendar className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-semibold text-sm">3 Meetings</p>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[#131313] border border-[#252525]">
            <Phone className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-semibold text-sm">5 Follow-ups</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[#131313] border border-[#252525]">
            <Mail className="w-5 h-5 text-purple-500" />
            <div>
              <p className="font-semibold text-sm">8 Proposals</p>
              <p className="text-xs text-muted-foreground">To Send</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
