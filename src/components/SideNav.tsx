// src/components/SideNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Globe, Zap, GraduationCap } from "lucide-react";

const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Programs", href: "/programs", icon: GraduationCap },
  { name: "Regional", href: "/regional", icon: Globe },
  { name: "Sprint", href: "/sprint", icon: Zap },
  { name: "Cohort", href: "/cohort", icon: Users },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">CA Performance Dashboard</h1>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
