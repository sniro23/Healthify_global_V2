
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";
import { cn } from "@/lib/utils";

interface HealthRecordCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

export function HealthRecordCard({
  className,
  title,
  icon,
  footer,
  children,
  ...props
}: HealthRecordCardProps) {
  return (
    <Card
      className={cn("overflow-hidden border-health-primary/20", className)}
      {...props}
    >
      <CardHeader className="bg-health-highlight">
        <div className="flex items-center">
          {icon && <span className="mr-2 text-health-primary">{icon}</span>}
          <CardTitle className="text-health-primary text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
      {footer && <CardFooter className="bg-gray-50">{footer}</CardFooter>}
    </Card>
  );
}
