import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Scan, ArrowRight, FileCheck } from "lucide-react";
import { categories, currencies } from "@/data/mockData";

export default function OCR() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      setLocation("/login");
    } else {
      setCurrentUser(JSON.parse(user));
    }
  }, [setLocation]);

  if (!currentUser) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      setExtractedData(null);
    }
  };

  const handleProcessReceipt = () => {
    if (!receiptFile) return;

    setIsProcessing(true);

    setTimeout(() => {
      const mockData = {
        amount: "245.50",
        currency: "USD",
        category: "Food",
        description: "Client dinner at Restaurant Le Bernardin - Business Development Meeting",
        date: new Date().toISOString().split("T")[0],
        merchant: "Le Bernardin Restaurant",
        items: ["Appetizers", "Main Course", "Dessert", "Beverages"],
      };

      setExtractedData(mockData);
      setIsProcessing(false);
    }, 2000);
  };

  const handleSubmitExpense = () => {
    alert("Expense submitted successfully with OCR data!");
    setReceiptFile(null);
    setExtractedData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-ocr-title">
            OCR Receipt Scanner
          </h1>
          <p className="text-muted-foreground">
            Upload a receipt and automatically extract expense details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-fit" data-testid="card-upload">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Receipt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <input
                  id="ocr-receipt"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  data-testid="input-ocr-receipt"
                />
                <label
                  htmlFor="ocr-receipt"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg border-border hover:border-primary transition-colors cursor-pointer hover-elevate"
                >
                  {receiptFile ? (
                    <div className="text-center">
                      <FileCheck className="h-16 w-16 mx-auto mb-4 text-success" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        {receiptFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(receiptFile.size / 1024).toFixed(2)} KB
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-foreground mb-1">
                        Click to upload receipt
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or PDF (max 10MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>

              {receiptFile && !extractedData && (
                <Button
                  onClick={handleProcessReceipt}
                  className="w-full gap-2"
                  size="lg"
                  disabled={isProcessing}
                  data-testid="button-process-receipt"
                >
                  {isProcessing ? (
                    <>
                      <Scan className="h-4 w-4 animate-pulse" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Scan className="h-4 w-4" />
                      Scan Receipt
                    </>
                  )}
                </Button>
              )}

              {extractedData && (
                <div className="flex items-center justify-center p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 text-success">
                    <ArrowRight className="h-5 w-5 animate-pulse" />
                    <span className="font-medium">Data extracted successfully!</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="h-fit" data-testid="card-extracted-data">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Extracted Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!extractedData ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                  <Scan className="h-16 w-16 mb-4 text-muted-foreground/50" />
                  <p className="text-sm">
                    Upload and scan a receipt to see extracted data
                  </p>
                </div>
              ) : (
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ocr-amount">Amount *</Label>
                      <Input
                        id="ocr-amount"
                        type="number"
                        step="0.01"
                        value={extractedData.amount}
                        className="font-mono text-lg"
                        data-testid="input-ocr-amount"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ocr-currency">Currency *</Label>
                      <Select value={extractedData.currency}>
                        <SelectTrigger id="ocr-currency" data-testid="select-ocr-currency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((curr) => (
                            <SelectItem key={curr.code} value={curr.code}>
                              {curr.symbol} {curr.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ocr-category">Category *</Label>
                    <Select value={extractedData.category}>
                      <SelectTrigger id="ocr-category" data-testid="select-ocr-category">
                        <SelectValue />
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

                  <div className="space-y-2">
                    <Label htmlFor="ocr-merchant">Merchant</Label>
                    <Input
                      id="ocr-merchant"
                      value={extractedData.merchant}
                      data-testid="input-ocr-merchant"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ocr-date">Date *</Label>
                    <Input
                      id="ocr-date"
                      type="date"
                      value={extractedData.date}
                      data-testid="input-ocr-date"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ocr-description">Description</Label>
                    <Textarea
                      id="ocr-description"
                      value={extractedData.description}
                      rows={3}
                      data-testid="input-ocr-description"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleSubmitExpense}
                    className="w-full mt-6"
                    size="lg"
                    data-testid="button-submit-ocr-expense"
                  >
                    Submit Expense
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
