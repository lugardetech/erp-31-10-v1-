import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}

export function BaseLayout({ children, className }: BaseLayoutProps) {
  return (
    <div className={cn("container mx-auto p-6 space-y-6", className)}>
      {children}
    </div>
  );
} 