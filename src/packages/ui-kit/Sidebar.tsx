
import React from "react";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

export function Sidebar({
  className,
  collapsed = false,
  children,
  ...props
}: SidebarProps) {
  return (
    <div
      className={cn(
        "bg-[var(--health-highlight)] h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

export function SidebarHeader({
  className,
  collapsed = false,
  children,
  ...props
}: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center h-16 px-4 border-b border-health-primary/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({
  className,
  children,
  ...props
}: SidebarContentProps) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  icon?: React.ReactNode;
  collapsed?: boolean;
}

export function SidebarItem({
  className,
  active = false,
  icon,
  collapsed = false,
  children,
  ...props
}: SidebarItemProps) {
  return (
    <div
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium cursor-pointer transition-colors",
        active
          ? "bg-[var(--health-primary)] text-white"
          : "text-gray-700 hover:bg-[var(--health-primary)/10]",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {!collapsed && children}
    </div>
  );
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({
  className,
  children,
  ...props
}: SidebarFooterProps) {
  return (
    <div
      className={cn(
        "mt-auto p-4 border-t border-health-primary/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
