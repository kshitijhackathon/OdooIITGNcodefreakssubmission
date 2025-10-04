import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar, User, FileText, Eye, Utensils, Plane, Package, Paperclip, Laptop, Wrench, BookOpen, Megaphone } from "lucide-react";
import { formatCurrency, getEmployeeName, getCurrencySymbol } from "@/data/mockData";
import type { Expense } from "@shared/schema";
import { format } from "date-fns";

interface ExpenseCardProps {
  expense: Expense;
  onView?: (expense: Expense) => void;
  showEmployee?: boolean;
}

export function ExpenseCard({ expense, onView, showEmployee = false }: ExpenseCardProps) {
  const categoryIcons: Record<string, any> = {
    Food: Utensils,
    Travel: Plane,
    Miscellaneous: Package,
    "Office Supplies": Paperclip,
    Software: Laptop,
    Equipment: Wrench,
    Training: BookOpen,
    Marketing: Megaphone,
  };

  const Icon = categoryIcons[expense.category] || Package;

  return (
    <Card className="hover-elevate transition-all" data-testid={`card-expense-${expense.id}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-base text-foreground truncate" data-testid={`text-expense-category-${expense.id}`}>
                {expense.category}
              </h3>
              <StatusBadge status={expense.status as any} size="sm" />
            </div>
            {expense.description && (
              <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-expense-description-${expense.id}`}>
                {expense.description}
              </p>
            )}
          </div>
        </div>
        <div className="text-right ml-4">
          <p className="font-mono text-xl font-semibold text-foreground" data-testid={`text-expense-amount-${expense.id}`}>
            {formatCurrency(expense.amount, expense.currency)}
          </p>
          {expense.currency !== "USD" && (
            <p className="text-xs text-muted-foreground mt-0.5">
              In {expense.currency}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span data-testid={`text-expense-date-${expense.id}`}>{format(new Date(expense.date), "MMM d, yyyy")}</span>
            </div>
            {showEmployee && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span data-testid={`text-expense-employee-${expense.id}`}>{getEmployeeName(expense.employeeId)}</span>
              </div>
            )}
            {expense.approverComment && (
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                <span className="truncate max-w-[200px]" data-testid={`text-expense-comment-${expense.id}`}>
                  {expense.approverComment}
                </span>
              </div>
            )}
          </div>

          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(expense)}
              className="gap-2"
              data-testid={`button-view-expense-${expense.id}`}
            >
              <Eye className="h-3.5 w-3.5" />
              View
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
