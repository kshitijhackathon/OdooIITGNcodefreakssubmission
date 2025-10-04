import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseTable } from "@/components/ExpenseTable";
import { ExpenseModal } from "@/components/ExpenseModal";
import { mockExpenses } from "@/data/mockData";
import { Plus, Receipt } from "lucide-react";
import type { Expense } from "@shared/schema";

export default function Employee() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>();
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      setLocation("/login");
    } else {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setExpenses(mockExpenses.filter((exp) => exp.employeeId === userData.id));
    }
  }, [setLocation]);

  if (!currentUser) return null;

  const handleCreateExpense = () => {
    setSelectedExpense(undefined);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleSubmitExpense = (data: Partial<Expense>) => {
    if (modalMode === "create") {
      const newExpense: Expense = {
        id: `exp-${Date.now()}`,
        employeeId: currentUser.id,
        amount: data.amount || "0",
        currency: data.currency || "USD",
        category: data.category || "",
        description: data.description || "",
        date: data.date || new Date(),
        status: "pending",
        receiptUrl: null,
        approverId: null,
        approverComment: null,
        approvedAt: null,
      };
      setExpenses([newExpense, ...expenses]);
    } else {
      setExpenses(
        expenses.map((exp) =>
          exp.id === selectedExpense?.id ? { ...exp, ...data } : exp
        )
      );
    }
  };

  const draftExpenses = expenses.filter((exp) => exp.status === "draft");
  const pendingExpenses = expenses.filter((exp) => exp.status === "pending");
  const processedExpenses = expenses.filter(
    (exp) => exp.status === "approved" || exp.status === "rejected"
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-employee-title">
              My Expenses
            </h1>
            <p className="text-muted-foreground">
              Submit and track your expense claims
            </p>
          </div>
          <Button
            onClick={handleCreateExpense}
            className="gap-2"
            size="lg"
            data-testid="button-create-expense"
          >
            <Plus className="h-4 w-4" />
            New Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-elevate transition-all" data-testid="card-stat-draft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Draft
              </CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{draftExpenses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Not yet submitted</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all" data-testid="card-stat-pending">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
              <Receipt className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{pendingExpenses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all" data-testid="card-stat-processed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Processed
              </CardTitle>
              <Receipt className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{processedExpenses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Approved or rejected</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-4 mb-6">
                <TabsTrigger value="all" data-testid="tab-all">
                  All ({expenses.length})
                </TabsTrigger>
                <TabsTrigger value="draft" data-testid="tab-draft">
                  Draft ({draftExpenses.length})
                </TabsTrigger>
                <TabsTrigger value="pending" data-testid="tab-pending">
                  Pending ({pendingExpenses.length})
                </TabsTrigger>
                <TabsTrigger value="processed" data-testid="tab-processed">
                  Processed ({processedExpenses.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <ExpenseTable
                  expenses={expenses}
                  onEdit={handleEditExpense}
                  showEmployee={false}
                />
              </TabsContent>

              <TabsContent value="draft">
                <ExpenseTable
                  expenses={draftExpenses}
                  onEdit={handleEditExpense}
                  showEmployee={false}
                />
              </TabsContent>

              <TabsContent value="pending">
                <ExpenseTable
                  expenses={pendingExpenses}
                  showEmployee={false}
                />
              </TabsContent>

              <TabsContent value="processed">
                <ExpenseTable
                  expenses={processedExpenses}
                  showEmployee={false}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <ExpenseModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitExpense}
        expense={selectedExpense}
        mode={modalMode}
      />
    </div>
  );
}
