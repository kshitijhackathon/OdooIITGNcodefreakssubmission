import type { User, Expense, ApprovalRule } from "@shared/schema";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    password: "password123",
    role: "admin",
    currency: "USD",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@company.com",
    password: "password123",
    role: "manager",
    currency: "USD",
  },
  {
    id: "3",
    name: "Emily Johnson",
    email: "emily.johnson@company.com",
    password: "password123",
    role: "employee",
    currency: "USD",
  },
  {
    id: "4",
    name: "David Park",
    email: "david.park@company.com",
    password: "password123",
    role: "employee",
    currency: "EUR",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    password: "password123",
    role: "employee",
    currency: "GBP",
  },
];

export const mockExpenses: Expense[] = [
  {
    id: "exp-1",
    employeeId: "3",
    amount: "245.50",
    currency: "USD",
    category: "Food",
    description: "Client dinner at Restaurant Le Bernardin",
    date: new Date("2025-01-15T19:30:00"),
    status: "pending",
    receiptUrl: null,
    approverId: null,
    approverComment: null,
    approvedAt: null,
  },
  {
    id: "exp-2",
    employeeId: "3",
    amount: "1250.00",
    currency: "USD",
    category: "Travel",
    description: "Flight tickets to San Francisco for client meeting",
    date: new Date("2025-01-10T08:00:00"),
    status: "approved",
    receiptUrl: null,
    approverId: "2",
    approverComment: "Approved for business development trip",
    approvedAt: new Date("2025-01-12T10:00:00"),
  },
  {
    id: "exp-3",
    employeeId: "4",
    amount: "450.00",
    currency: "EUR",
    category: "Miscellaneous",
    description: "Office supplies and equipment",
    date: new Date("2025-01-08T14:20:00"),
    status: "approved",
    receiptUrl: null,
    approverId: "2",
    approverComment: "All items approved",
    approvedAt: new Date("2025-01-09T09:15:00"),
  },
  {
    id: "exp-4",
    employeeId: "4",
    amount: "89.99",
    currency: "EUR",
    category: "Food",
    description: "Team lunch meeting",
    date: new Date("2025-01-20T12:30:00"),
    status: "pending",
    receiptUrl: null,
    approverId: null,
    approverComment: null,
    approvedAt: null,
  },
  {
    id: "exp-5",
    employeeId: "5",
    amount: "320.00",
    currency: "GBP",
    category: "Travel",
    description: "Taxi to airport and parking fees",
    date: new Date("2025-01-05T06:00:00"),
    status: "rejected",
    receiptUrl: null,
    approverId: "2",
    approverComment: "Personal travel, not reimbursable",
    approvedAt: new Date("2025-01-06T11:00:00"),
  },
  {
    id: "exp-6",
    employeeId: "3",
    amount: "75.00",
    currency: "USD",
    category: "Food",
    description: "Working lunch with vendor",
    date: new Date("2025-01-22T13:00:00"),
    status: "draft",
    receiptUrl: null,
    approverId: null,
    approverComment: null,
    approvedAt: null,
  },
  {
    id: "exp-7",
    employeeId: "5",
    amount: "540.50",
    currency: "GBP",
    category: "Travel",
    description: "Hotel accommodation for conference",
    date: new Date("2025-01-18T15:00:00"),
    status: "pending",
    receiptUrl: null,
    approverId: null,
    approverComment: null,
    approvedAt: null,
  },
  {
    id: "exp-8",
    employeeId: "4",
    amount: "199.99",
    currency: "EUR",
    category: "Miscellaneous",
    description: "Software subscription renewal",
    date: new Date("2025-01-12T10:00:00"),
    status: "approved",
    receiptUrl: null,
    approverId: "2",
    approverComment: "Business necessity approved",
    approvedAt: new Date("2025-01-13T14:30:00"),
  },
];

export const mockApprovalRules: ApprovalRule[] = [
  {
    id: "rule-1",
    name: "Approval for miscellaneous expenses",
    type: "specific",
    threshold: null,
    percentage: null,
    approverId: "2",
    category: "Miscellaneous",
  },
  {
    id: "rule-2",
    name: "Manager approval for expenses above $500",
    type: "percentage",
    threshold: "500.00",
    percentage: 100,
    approverId: null,
    category: null,
  },
  {
    id: "rule-3",
    name: "Hybrid rule for high-value travel",
    type: "hybrid",
    threshold: "1000.00",
    percentage: 50,
    approverId: "1",
    category: "Travel",
  },
];

export const categories = [
  "Food",
  "Travel",
  "Miscellaneous",
  "Office Supplies",
  "Software",
  "Equipment",
  "Training",
  "Marketing",
];

export const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
];

export const defaultCurrency = "USD";

export function getCurrencySymbol(code: string): string {
  return currencies.find((c) => c.code === code)?.symbol || "$";
}

export function formatCurrency(amount: string | number, currency: string): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${numAmount.toFixed(2)}`;
}

export function getEmployeeName(employeeId: string): string {
  return mockUsers.find((u) => u.id === employeeId)?.name || "Unknown";
}

export function getApproverName(approverId: string | null): string {
  if (!approverId) return "N/A";
  return mockUsers.find((u) => u.id === approverId)?.name || "Unknown";
}
