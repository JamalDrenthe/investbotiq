import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThreeScene } from "@/components/three/ThreeScene";
import { 
  Users, 
  CheckSquare, 
  CircleDollarSign, 
  Sparkles, 
  Bell,
  Activity,
  AlertTriangle,
  Share2
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [insights, setInsights] = useState({
    activeMembers: 0,
    totalCashflow: 0,
    activeBelLoans: 0,
    totalSpirits: 0
  });
  const [activities, setActivities] = useState([
    { 
      id: 1, 
      type: "spirit", 
      message: "Spirit Gamma geactiveerd voor Lucas de Wit", 
      time: "5 minuten geleden" 
    },
    { 
      id: 2, 
      type: "message", 
      message: "Bericht verzonden naar Emma Visser", 
      time: "12 minuten geleden" 
    },
    { 
      id: 3, 
      type: "task", 
      message: "Nieuwe taak aangemaakt voor Sophie Bakker", 
      time: "30 minuten geleden" 
    }
  ]);
  const [alerts, setAlerts] = useState([
    { id: 1, message: "3 users hebben taken met deadline vandaag" },
    { id: 2, message: "5 users wachten op spiritactivatie" }
  ]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setInsights({
          activeMembers: 24,
          totalCashflow: 18400,
          activeBelLoans: 17,
          totalSpirits: 31
        });
      } catch (error) {
        console.error("Error fetching dashboard insights:", error);
      }
    };

    fetchInsights();
  }, []);

  const adminMenuItems = [
    {
      title: "Gebruikers",
      description: "Beheer alle gebruikers en hun toegang",
      icon: <Users className="h-8 w-8" />,
      path: "/admin/users",
      color: "bg-cyan/15 text-cyan-300",
    },
    {
      title: "Taken Beheer",
      description: "Taken configureren en toewijzen aan gebruikers",
      icon: <CheckSquare className="h-8 w-8" />,
      path: "/admin/tasks",
      color: "bg-mint/15 text-mint",
    },
    {
      title: "Cashflow Beheer",
      description: "Beheer cashflow settings en rapportages",
      icon: <CircleDollarSign className="h-8 w-8" />,
      path: "/admin/cashflows",
      color: "bg-amber/15 text-amber",
    },
    {
      title: "Spirits Beheer",
      description: "Configureer en beheer de spirits voor gebruikers",
      icon: <Sparkles className="h-8 w-8" />,
      path: "/admin/spirits",
      color: "bg-indigo/20 text-indigo-300",
    },
    {
      title: "Notificaties",
      description: "Beheer systeem en gebruiker notificaties",
      icon: <Bell className="h-8 w-8" />,
      path: "/admin/notifications",
      color: "bg-rose/15 text-rose",
    },
    {
      title: "Referrals",
      description: "Beheer referrals en beloningen",
      icon: <Share2 className="h-8 w-8" />,
      path: "/admin/referrals",
      color: "bg-indigo/15 text-indigo-200",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "spirit":
        return <Sparkles className="h-4 w-4 text-purple-500" />;
      case "message":
        return <Bell className="h-4 w-4 text-blue-500" />;
      case "task":
        return <CheckSquare className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4 text-ink-faint" />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col gap-6">
            <section className="card-glass relative isolate overflow-hidden px-6 py-8 md:px-10 md:py-10">
              <ThreeScene
                kind="dot-matrix"
                className="!absolute !inset-0"
                speed={0.5}
                gridScale={48}
                mouseAmount={0.04}
                pulseSpeed={0.3}
                radius={0.12}
                opacity={0.35}
                hue={-20}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(90deg, rgba(17,24,50,0.95) 0%, rgba(17,24,50,0.5) 60%, rgba(17,24,50,0.1) 100%)" }}
              />
              <div className="relative space-y-3">
                <div className="eyebrow">Beheer</div>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">Admin Dashboard</h1>
                <p className="max-w-2xl text-ink-muted">
                  Welkom bij het beheerderspanel van Investbotiq. Als admin kun je hier het volledige platform beheren.
                </p>
              </div>
            </section>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Actieve Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-2xl font-bold">{insights.activeMembers}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fade-in" style={{ animationDelay: "0.1s" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Totale Maandelijkse Cashflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CircleDollarSign className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">€ {insights.totalCashflow}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fade-in" style={{ animationDelay: "0.2s" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">BEL-Leningen Actief</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CircleDollarSign className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-2xl font-bold">{insights.activeBelLoans}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fade-in" style={{ animationDelay: "0.3s" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Spirits Actief</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-2xl font-bold">{insights.totalSpirits}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {alerts.length > 0 && (
              <Card className="border-amber/30 bg-amber/10 fade-in" style={{ animationDelay: "0.4s" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    Waarschuwingen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {alerts.map(alert => (
                      <li key={alert.id} className="flex items-start">
                        <AlertTriangle className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-amber" />
                        <span className="text-ink">{alert.message}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminMenuItems.map((item, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer overflow-hidden transition-shadow hover:shadow-glow fade-in"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  onClick={() => navigate(item.path)}
                >
                  <CardHeader className={`${item.color} rounded-t-[inherit] border-b border-canvas-hairline`}>
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full mobile-btn" 
                      variant="outline"
                      onClick={() => navigate(item.path)}
                    >
                      Beheren
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card className="fade-in" style={{ animationDelay: "0.8s" }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <ul className="space-y-4">
                  {activities.map(activity => (
                    <li key={activity.id} className="flex items-start border-b pb-2">
                      <div className="mr-3 mt-0.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Alle activiteiten bekijken
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminDashboard, ["admin"]);
