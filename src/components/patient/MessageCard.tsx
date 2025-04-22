
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
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => (
  <Card className={`w-full hover:shadow-lg transition-shadow animate-fade-in ${message.unread ? "border-2 border-health-primary" : ""}`}>
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
    <CardContent className="text-gray-700">{message.preview}</CardContent>
  </Card>
);

export default MessageCard;
