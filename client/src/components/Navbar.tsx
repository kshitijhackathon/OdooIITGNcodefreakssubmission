import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LayoutDashboard, Users, UserCheck, Settings, ScanLine, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

export function Navbar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.href = "/login";
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/employee", label: "Employee", icon: Users },
    { path: "/manager", label: "Manager", icon: UserCheck },
    { path: "/rules", label: "Rules", icon: Settings },
    { path: "/ocr", label: "OCR", icon: ScanLine },
  ];

  if (location === "/login") {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard">
              <a className="flex items-center gap-2 text-xl font-bold text-foreground hover-elevate rounded-md px-2 py-1" data-testid="link-logo">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <span className="font-mono text-sm">EM</span>
                </div>
                <span>Expense Manager</span>
              </a>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <a data-testid={`link-nav-${item.label.toLowerCase()}`}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        size="sm"
                        className={`gap-2 ${isActive ? "bg-muted" : ""}`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-3 mr-2 px-3 py-1 rounded-md bg-muted/50">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground" data-testid="text-user-name">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground capitalize" data-testid="text-user-role">{currentUser.role}</p>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="hover-elevate"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {currentUser && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                data-testid="button-logout"
                className="hover-elevate"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
