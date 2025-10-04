import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Utensils, Plane, Package, Paperclip, Laptop, Wrench, BookOpen, Megaphone, FileText } from "lucide-react";
import { formatCurrency, getEmployeeName } from "@/data/mockData";
import type { Expense } from "@shared/schema";
import { format } from "date-fns";

interface ExpenseTableProps {
  expenses: Expense[];
  onView?: (expense: Expense) => void;
  onEdit?: (expense: Expense) => void;
  showEmployee?: boolean;
}

export function ExpenseTable({ expenses, onView, onEdit, showEmployee = false }: ExpenseTableProps) {
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

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">No expenses found</h3>
        <p className="text-sm text-muted-foreground">
          {showEmployee ? "No expenses to display" : "Submit your first expense to get started"}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              {showEmployee && <TableHead className="font-semibold">Employee</TableHead>}
              <TableHead className="font-semibold text-right">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} className="hover:bg-muted/30" data-testid={`row-expense-${expense.id}`}>
                <TableCell className="font-medium" data-testid={`cell-date-${expense.id}`}>
                  {format(new Date(expense.date), "MMM d, yyyy")}
                </TableCell>
                <TableCell data-testid={`cell-category-${expense.id}`}>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = categoryIcons[expense.category] || Package;
                      return <Icon className="h-4 w-4 text-primary" />;
                    })()}
                    <span>{expense.category}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate" data-testid={`cell-description-${expense.id}`}>
                  {expense.description || "—"}
                </TableCell>
                {showEmployee && (
                  <TableCell data-testid={`cell-employee-${expense.id}`}>
                    {getEmployeeName(expense.employeeId)}
                  </TableCell>
                )}
                <TableCell className="text-right font-mono font-semibold" data-testid={`cell-amount-${expense.id}`}>
                  {formatCurrency(expense.amount, expense.currency)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={expense.status as any} size="sm" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView(expense)}
                        data-testid={`button-view-${expense.id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {onEdit && expense.status === "draft" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(expense)}
                        data-testid={`button-edit-${expense.id}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
