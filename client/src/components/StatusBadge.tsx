import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, FileEdit } from "lucide-react";

interface StatusBadgeProps {
  status: "approved" | "rejected" | "pending" | "draft";
  size?: "sm" | "default";
}

export function StatusBadge({ status, size = "default" }: StatusBadgeProps) {
  const config = {
    approved: {
      label: "Approved",
      className: "bg-success/10 text-success border-success/20 hover:bg-success/20",
      icon: CheckCircle2,
    },
    rejected: {
      label: "Rejected",
      className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20",
      icon: XCircle,
    },
    pending: {
      label: "Pending",
      className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
      icon: Clock,
    },
    draft: {
      label: "Draft",
      className: "bg-muted/50 text-muted-foreground border-border hover:bg-muted",
      icon: FileEdit,
    },
  };

  const { label, className, icon: Icon } = config[status];
  const iconSize = size === "sm" ? 12 : 14;

  return (
    <Badge
      variant="outline"
      className={`${className} ${size === "sm" ? "text-xs px-2 py-0.5" : "px-3 py-1"} font-semibold rounded-full flex items-center gap-1.5 w-fit`}
      data-testid={`badge-status-${status}`}
    >
      <Icon className="w-3 h-3" size={iconSize} />
      {label}
    </Badge>
  );
}
