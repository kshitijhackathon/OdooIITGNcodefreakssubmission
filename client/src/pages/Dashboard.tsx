import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockExpenses, mockUsers, formatCurrency } from "@/data/mockData";
import {
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  UserCheck,
  Settings,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { ExpenseTable } from "@/components/ExpenseTable";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      setLocation("/login");
    } else {
      setCurrentUser(JSON.parse(user));
    }
  }, [setLocation]);

  if (!currentUser) return null;

  const totalExpenses = mockExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const pendingExpenses = mockExpenses.filter((exp) => exp.status === "pending");
  const approvedExpenses = mockExpenses.filter((exp) => exp.status === "approved");
  const rejectedExpenses = mockExpenses.filter((exp) => exp.status === "rejected");
  const recentExpenses = [...mockExpenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses, "USD"),
      icon: DollarSign,
      description: `${mockExpenses.length} total submissions`,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Pending Approvals",
      value: pendingExpenses.length,
      icon: Clock,
      description: `${formatCurrency(pendingExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0), "USD")} pending`,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Approved",
      value: approvedExpenses.length,
      icon: CheckCircle,
      description: `${formatCurrency(approvedExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0), "USD")} approved`,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Rejected",
      value: rejectedExpenses.length,
      icon: XCircle,
      description: `${formatCurrency(rejectedExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0), "USD")} rejected`,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  const quickActions = [
    {
      title: "Employee View",
      description: "Submit and track your expenses",
      icon: Users,
      href: "/employee",
      color: "primary",
    },
    {
      title: "Manager View",
      description: "Review and approve expenses",
      icon: UserCheck,
      href: "/manager",
      color: "primary",
    },
    {
      title: "Approval Rules",
      description: "Configure approval workflows",
      icon: Settings,
      href: "/rules",
      color: "primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-dashboard-title">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your expense management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover-elevate transition-all" data-testid={`card-stat-${stat.title.toLowerCase().replace(/\s/g, '-')}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-1" data-testid={`text-stat-value-${stat.title.toLowerCase().replace(/\s/g, '-')}`}>
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground" data-testid={`text-stat-description-${stat.title.toLowerCase().replace(/\s/g, '-')}`}>
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.title}
                className="hover-elevate transition-all cursor-pointer group"
                onClick={() => setLocation(action.href)}
                data-testid={`card-action-${action.title.toLowerCase().replace(/\s/g, '-')}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg bg-primary/10`}>
                      <Icon className={`h-6 w-6 text-primary`} />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Latest expense submissions
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/employee")}
              className="gap-2"
              data-testid="button-view-all-expenses"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ExpenseTable expenses={recentExpenses} showEmployee={true} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
