
import React from "react";
import MessageCard from "./MessageCard";
import { MessageCircle } from "lucide-react";

const mockMessages = [
  {
    id: "m1",
    from: "Dr. Jane Smith",
    date: "April 18th, 2025",
    preview: "Your lab results are back and everything looks good.",
    unread: true,
  },
  {
    id: "m2",
    from: "Reception",
    date: "April 10th, 2025",
    preview: "Please remember to bring your insurance card to your next appointment.",
    unread: false,
  },
];

const Messages = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <MessageCircle className="h-6 w-6 text-health-primary" />
      Messages
    </h2>
    <div className="flex flex-col gap-4">
      {mockMessages.map((msg) => (
        <MessageCard key={msg.id} message={msg} />
      ))}
    </div>
  </div>
);

export default Messages;
