import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApprovalActionCard } from "@/components/ApprovalActionCard";
import { mockExpenses } from "@/data/mockData";
import { Filter, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import type { Expense } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Manager() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      setLocation("/login");
    } else {
      setCurrentUser(JSON.parse(user));
    }
  }, [setLocation]);

  if (!currentUser) return null;

  const handleApprove = (expenseId: string, comment: string) => {
    setExpenses(
      expenses.map((exp) =>
        exp.id === expenseId
          ? {
              ...exp,
              status: "approved",
              approverId: currentUser.id,
              approverComment: comment || "Approved",
              approvedAt: new Date(),
            }
          : exp
      )
    );
  };

  const handleReject = (expenseId: string, comment: string) => {
    setExpenses(
      expenses.map((exp) =>
        exp.id === expenseId
          ? {
              ...exp,
              status: "rejected",
              approverId: currentUser.id,
              approverComment: comment,
              approvedAt: new Date(),
            }
          : exp
      )
    );
  };

  const pendingExpenses = expenses.filter((exp) => exp.status === "pending");
  const approvedExpenses = expenses.filter((exp) => exp.status === "approved");
  const rejectedExpenses = expenses.filter((exp) => exp.status === "rejected");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-manager-title">
            Expense Approvals
          </h1>
          <p className="text-muted-foreground">
            Review and approve expense claims from your team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-elevate transition-all" data-testid="card-stat-pending-manager">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Review
              </CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{pendingExpenses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting your decision</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all" data-testid="card-stat-approved-manager">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Approved
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{approvedExpenses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Successfully approved</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all" data-testid="card-stat-rejected-manager">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rejected
              </CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{rejectedExpenses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Declined requests</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                <TabsTrigger value="pending" data-testid="tab-pending-manager">
                  Pending ({pendingExpenses.length})
                </TabsTrigger>
                <TabsTrigger value="approved" data-testid="tab-approved-manager">
                  Approved ({approvedExpenses.length})
                </TabsTrigger>
                <TabsTrigger value="rejected" data-testid="tab-rejected-manager">
                  Rejected ({rejectedExpenses.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                {pendingExpenses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4">
                      <CheckCircle className="h-16 w-16 mx-auto text-success/50" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">All caught up!</h3>
                    <p className="text-sm text-muted-foreground">
                      No pending expenses to review at the moment
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingExpenses.map((expense) => (
                      <ApprovalActionCard
                        key={expense.id}
                        expense={expense}
                        onApprove={handleApprove}
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="approved">
                {approvedExpenses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4">
                      <FileText className="h-16 w-16 mx-auto text-muted-foreground/50" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">No approved expenses</h3>
                    <p className="text-sm text-muted-foreground">
                      Approved expenses will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {approvedExpenses.map((expense) => (
                      <ApprovalActionCard
                        key={expense.id}
                        expense={expense}
                        onApprove={handleApprove}
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="rejected">
                {rejectedExpenses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4">
                      <FileText className="h-16 w-16 mx-auto text-muted-foreground/50" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">No rejected expenses</h3>
                    <p className="text-sm text-muted-foreground">
                      Rejected expenses will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rejectedExpenses.map((expense) => (
                      <ApprovalActionCard
                        key={expense.id}
                        expense={expense}
                        onApprove={handleApprove}
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
