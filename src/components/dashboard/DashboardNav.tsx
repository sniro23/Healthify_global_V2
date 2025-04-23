
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/packages/ui-kit";
import { LucideIcon } from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

interface DashboardNavProps {
  items: NavItem[];
}

export const DashboardNav = ({ items }: DashboardNavProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Link key={item.title} to={item.link} style={{ textDecoration: 'none' }}>
          <Card className="flex flex-col items-center justify-center px-2 py-4 hover:shadow-lg transition-shadow animate-fade-in h-full">
            <CardHeader className="flex flex-col items-center space-y-2 border-none bg-transparent p-2">
              <item.icon className="h-8 w-8 text-health-primary" />
              <CardTitle className="text-base text-gray-700">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600 text-sm p-2">
              {item.description}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
