import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "./StatusBadge";
import { CheckCircle, XCircle, MessageSquare, Calendar, User, Utensils, Plane, Package, Paperclip, Laptop, Wrench, BookOpen, Megaphone } from "lucide-react";
import { formatCurrency, getEmployeeName } from "@/data/mockData";
import type { Expense } from "@shared/schema";
import { format } from "date-fns";
import { useState } from "react";

interface ApprovalActionCardProps {
  expense: Expense;
  onApprove: (expenseId: string, comment: string) => void;
  onReject: (expenseId: string, comment: string) => void;
}

export function ApprovalActionCard({ expense, onApprove, onReject }: ApprovalActionCardProps) {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");

  const handleApprove = () => {
    onApprove(expense.id, comment);
    setComment("");
    setShowComment(false);
  };

  const handleReject = () => {
    if (!comment.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    onReject(expense.id, comment);
    setComment("");
    setShowComment(false);
  };

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
    <Card className="hover-elevate transition-all" data-testid={`card-approval-${expense.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-foreground" data-testid={`text-approval-category-${expense.id}`}>
                  {expense.category}
                </h3>
                <StatusBadge status={expense.status as any} size="sm" />
              </div>
              {expense.description && (
                <p className="text-sm text-muted-foreground mb-3" data-testid={`text-approval-description-${expense.id}`}>
                  {expense.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span data-testid={`text-approval-employee-${expense.id}`}>{getEmployeeName(expense.employeeId)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span data-testid={`text-approval-date-${expense.id}`}>{format(new Date(expense.date), "MMM d, yyyy")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-2xl font-bold text-foreground" data-testid={`text-approval-amount-${expense.id}`}>
              {formatCurrency(expense.amount, expense.currency)}
            </p>
            {expense.currency !== "USD" && (
              <p className="text-xs text-muted-foreground mt-1">
                In {expense.currency}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {showComment ? (
          <div className="space-y-3">
            <Textarea
              placeholder="Add a comment (optional for approval, required for rejection)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="resize-none"
              data-testid={`input-comment-${expense.id}`}
            />
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowComment(false);
                  setComment("");
                }}
                data-testid={`button-cancel-comment-${expense.id}`}
              >
                Cancel
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReject}
                  className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                  data-testid={`button-reject-confirm-${expense.id}`}
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={handleApprove}
                  className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
                  data-testid={`button-approve-confirm-${expense.id}`}
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComment(true)}
              className="gap-2 flex-1"
              data-testid={`button-add-comment-${expense.id}`}
            >
              <MessageSquare className="h-4 w-4" />
              Add Comment
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowComment(true);
              }}
              className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
              data-testid={`button-reject-${expense.id}`}
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onApprove(expense.id, "");
              }}
              className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
              data-testid={`button-approve-${expense.id}`}
            >
              <CheckCircle className="h-4 w-4" />
              Approve
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
