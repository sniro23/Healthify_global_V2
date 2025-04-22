
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/packages/ui-kit";
import { User, Calendar } from "lucide-react";

interface MessageCardProps {
  message: {
    id: string;
    from: string;
    date: string;
    preview: string;
    unread: boolean;
  };
  active?: boolean;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, active = false }) => (
  <Card className={`w-full hover:shadow-lg transition-shadow animate-fade-in cursor-pointer
    ${message.unread ? "border-2 border-health-primary" : ""} 
    ${active ? "bg-health-highlight border-2 border-health-primary" : ""}`}>
    <CardHeader className="flex flex-row justify-between items-center border-none">
      <CardTitle className="flex items-center gap-2 text-base">
        <User className="h-4 w-4 text-health-primary" />
        {message.from}
      </CardTitle>
      <span className="flex items-center gap-1 text-sm text-gray-500">
        <Calendar className="h-4 w-4" />
        {message.date}
      </span>
    </CardHeader>
    <CardContent className="text-gray-700">
      <div className="flex justify-between items-center">
        <p className="line-clamp-1">{message.preview}</p>
        {message.unread && (
          <span className="h-2.5 w-2.5 bg-health-primary rounded-full ml-2"></span>
        )}
      </div>
    </CardContent>
  </Card>
);

export default MessageCard;
