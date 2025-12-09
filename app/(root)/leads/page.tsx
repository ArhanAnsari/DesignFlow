import { LeadGenerator } from "@/components/LeadGenerator";
import { OutreachComposer } from "@/components/OutreachComposer";
import { ClientsDashboard } from "@/components/ClientsDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Users, Mail } from "lucide-react";

export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br ">
      {/* Header */}
      <div className="bg-black border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Lead Management</h1>
          </div>
          <p className="text-gray-600">
            AI-powered lead generation, qualification, and client management all
            in one place
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 bg-dark">
        <Tabs defaultValue="generate" className="space-y-6 bg-dark">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate
            </TabsTrigger>
            {/* <TabsTrigger value="outreach" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Outreach
            </TabsTrigger> */}
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <LeadGenerator />
          </TabsContent>

          <TabsContent value="outreach" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <OutreachComposer />
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <ClientsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
