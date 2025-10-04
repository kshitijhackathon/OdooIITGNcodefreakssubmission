import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockApprovalRules, mockUsers, categories } from "@/data/mockData";
import { Plus, Percent, User, Settings as SettingsIcon, Pencil, Trash2 } from "lucide-react";
import type { ApprovalRule } from "@shared/schema";

export default function Rules() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [rules, setRules] = useState<ApprovalRule[]>(mockApprovalRules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ApprovalRule>>({
    name: "",
    type: "percentage",
    threshold: null,
    percentage: null,
    approverId: null,
    category: null,
  });

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      setLocation("/login");
    } else {
      setCurrentUser(JSON.parse(user));
    }
  }, [setLocation]);

  if (!currentUser) return null;

  const handleCreateRule = () => {
    setFormData({
      name: "",
      type: "percentage",
      threshold: null,
      percentage: null,
      approverId: null,
      category: null,
    });
    setIsModalOpen(true);
  };

  const handleSubmitRule = (e: React.FormEvent) => {
    e.preventDefault();
    const newRule: ApprovalRule = {
      id: `rule-${Date.now()}`,
      name: formData.name || "",
      type: formData.type || "percentage",
      threshold: formData.threshold,
      percentage: formData.percentage ? parseInt(formData.percentage.toString()) : null,
      approverId: formData.approverId,
      category: formData.category,
    };
    setRules([...rules, newRule]);
    setIsModalOpen(false);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const percentageRules = rules.filter((rule) => rule.type === "percentage");
  const specificRules = rules.filter((rule) => rule.type === "specific");
  const hybridRules = rules.filter((rule) => rule.type === "hybrid");

  const managers = mockUsers.filter((u) => u.role === "manager" || u.role === "admin");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-rules-title">
              Approval Rules
            </h1>
            <p className="text-muted-foreground">
              Configure automated approval workflows
            </p>
          </div>
          <Button
            onClick={handleCreateRule}
            className="gap-2"
            size="lg"
            data-testid="button-create-rule"
          >
            <Plus className="h-4 w-4" />
            New Rule
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="percentage" className="w-full">
              <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-6">
                <TabsTrigger value="percentage" className="gap-2" data-testid="tab-percentage">
                  <Percent className="h-4 w-4" />
                  Percentage ({percentageRules.length})
                </TabsTrigger>
                <TabsTrigger value="specific" className="gap-2" data-testid="tab-specific">
                  <User className="h-4 w-4" />
                  Specific ({specificRules.length})
                </TabsTrigger>
                <TabsTrigger value="hybrid" className="gap-2" data-testid="tab-hybrid">
                  <SettingsIcon className="h-4 w-4" />
                  Hybrid ({hybridRules.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="percentage">
                <div className="space-y-4">
                  {percentageRules.map((rule) => (
                    <Card key={rule.id} className="hover-elevate transition-all" data-testid={`card-rule-${rule.id}`}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold">{rule.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {rule.percentage}% approval required for expenses above{" "}
                            ${rule.threshold}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteRule(rule.id)}
                            data-testid={`button-delete-${rule.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                  {percentageRules.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No percentage rules configured
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="specific">
                <div className="space-y-4">
                  {specificRules.map((rule) => (
                    <Card key={rule.id} className="hover-elevate transition-all" data-testid={`card-rule-${rule.id}`}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold">{rule.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {rule.category} expenses require approval from{" "}
                            {mockUsers.find((u) => u.id === rule.approverId)?.name || "Unknown"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteRule(rule.id)}
                            data-testid={`button-delete-${rule.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                  {specificRules.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No specific approver rules configured
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="hybrid">
                <div className="space-y-4">
                  {hybridRules.map((rule) => (
                    <Card key={rule.id} className="hover-elevate transition-all" data-testid={`card-rule-${rule.id}`}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold">{rule.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {rule.category} expenses above ${rule.threshold} require {rule.percentage}%
                            approval from {mockUsers.find((u) => u.id === rule.approverId)?.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteRule(rule.id)}
                            data-testid={`button-delete-${rule.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                  {hybridRules.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No hybrid rules configured
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]" data-testid="modal-rule">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Create Approval Rule</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitRule} className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="rule-name">Rule Name *</Label>
              <Input
                id="rule-name"
                placeholder="e.g., Manager approval for high expenses"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                data-testid="input-rule-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rule-type">Rule Type *</Label>
              <Select
                value={formData.type || "percentage"}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger id="rule-type" data-testid="select-rule-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="specific">Specific Approver</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.type === "percentage" || formData.type === "hybrid") && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threshold">Threshold Amount ($)</Label>
                  <Input
                    id="threshold"
                    type="number"
                    step="0.01"
                    placeholder="500.00"
                    value={formData.threshold || ""}
                    onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                    data-testid="input-threshold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentage">Approval Percentage (%)</Label>
                  <Input
                    id="percentage"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="100"
                    value={formData.percentage || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, percentage: parseInt(e.target.value) || null })
                    }
                    data-testid="input-percentage"
                  />
                </div>
              </div>
            )}

            {(formData.type === "specific" || formData.type === "hybrid") && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="approver">Approver</Label>
                  <Select
                    value={formData.approverId || ""}
                    onValueChange={(value) => setFormData({ ...formData, approverId: value })}
                  >
                    <SelectTrigger id="approver" data-testid="select-approver">
                      <SelectValue placeholder="Select approver" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.map((manager) => (
                        <SelectItem key={manager.id} value={manager.id}>
                          {manager.name} ({manager.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category || ""}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category" data-testid="select-rule-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                data-testid="button-cancel-rule"
              >
                Cancel
              </Button>
              <Button type="submit" data-testid="button-submit-rule">
                Create Rule
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
