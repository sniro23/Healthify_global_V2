
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, Phone, ArrowRight, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Messages = () => {
  const [selectedChat, setSelectedChat] = React.useState<string | null>("1");
  
  return (
    <div className="flex h-full">
      {/* Conversation list */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <Input
            placeholder="Search conversations..." 
            className="w-full"
          />
        </div>
        <Tabs defaultValue="all" className="w-full">
          <div className="px-4 border-b border-gray-200">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
              <TabsTrigger value="urgent" className="flex-1">Urgent</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[calc(100vh-230px)] py-2">
              {conversations.map((conversation) => (
                <ConversationItem 
                  key={conversation.id}
                  conversation={conversation}
                  isSelected={selectedChat === conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                />
              ))}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="unread" className="mt-0">
            <ScrollArea className="h-[calc(100vh-230px)] py-2">
              {conversations
                .filter(c => c.unread)
                .map((conversation) => (
                  <ConversationItem 
                    key={conversation.id}
                    conversation={conversation}
                    isSelected={selectedChat === conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                  />
                ))}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="urgent" className="mt-0">
            <ScrollArea className="h-[calc(100vh-230px)] py-2">
              {conversations
                .filter(c => c.urgent)
                .map((conversation) => (
                  <ConversationItem 
                    key={conversation.id}
                    conversation={conversation}
                    isSelected={selectedChat === conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                  />
                ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Chat window */}
      <div className="hidden md:flex flex-col w-2/3 lg:w-3/4 h-full">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-health-primary">
                    {getSelectedConversation()?.patient.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <h2 className="font-medium">{getSelectedConversation()?.patient}</h2>
                  <p className="text-sm text-gray-500">{getSelectedConversation()?.patientId}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline">View Patient Profile</Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {getSelectedConversation()?.messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'doctor'
                        ? 'bg-health-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'doctor' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..." 
                  className="flex-1"
                />
                <Button className="bg-health-primary hover:bg-health-primary/90">Send</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Empty state for mobile */}
      <div className="flex md:hidden flex-1 items-center justify-center">
        <div className="text-center p-6">
          <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium mb-1">Select a conversation</h3>
          <p className="text-gray-500 mb-4">Choose a patient to view your conversation</p>
        </div>
      </div>
    </div>
  );

  function getSelectedConversation() {
    return conversations.find(c => c.id === selectedChat);
  }
};

interface Conversation {
  id: string;
  patient: string;
  patientId: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  urgent: boolean;
  messages: {
    sender: 'patient' | 'doctor';
    content: string;
    time: string;
  }[];
}

const ConversationItem = ({ 
  conversation, 
  isSelected, 
  onClick 
}: { 
  conversation: Conversation; 
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div 
      className={`px-4 py-3 cursor-pointer ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-health-primary">
              {conversation.patient.charAt(0)}
            </div>
          </Avatar>
          <div>
            <div className="font-medium flex items-center">
              {conversation.patient}
              {conversation.unread && (
                <Badge className="ml-2 bg-health-primary px-1.5 h-5">New</Badge>
              )}
              {conversation.urgent && (
                <Badge className="ml-2 bg-red-500 px-1.5 h-5">Urgent</Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 line-clamp-1">{conversation.lastMessage}</p>
          </div>
        </div>
        <span className="text-xs text-gray-500">{conversation.time}</span>
      </div>
    </div>
  );
};

const conversations: Conversation[] = [
  {
    id: "1",
    patient: "Sarah Miller",
    patientId: "PT-78542",
    lastMessage: "Yes, that sounds good. The symptoms have improved since starting...",
    time: "10:30 AM",
    unread: true,
    urgent: false,
    messages: [
      {
        sender: 'patient',
        content: "Hello Dr. Johnson, I wanted to ask about the new medication you prescribed. I've been taking it for 3 days now.",
        time: "10:15 AM"
      },
      {
        sender: 'doctor',
        content: "Hello Sarah, how are you feeling with the new medication? Any side effects?",
        time: "10:20 AM"
      },
      {
        sender: 'patient',
        content: "I'm feeling better, the headaches have reduced. No major side effects except for some mild drowsiness in the morning.",
        time: "10:25 AM"
      },
      {
        sender: 'doctor',
        content: "That's good to hear. The drowsiness is an expected side effect and should improve within a week. Would you like to schedule a follow-up appointment next week?",
        time: "10:28 AM"
      },
      {
        sender: 'patient',
        content: "Yes, that sounds good. The symptoms have improved since starting the medication.",
        time: "10:30 AM"
      }
    ]
  },
  {
    id: "2",
    patient: "John Davis",
    patientId: "PT-34567",
    lastMessage: "I've been experiencing chest pain since yesterday evening...",
    time: "Yesterday",
    unread: true,
    urgent: true,
    messages: [
      {
        sender: 'patient',
        content: "Dr. Johnson, I've been experiencing chest pain since yesterday evening. It feels tight and sometimes gets worse when I breathe deeply.",
        time: "Yesterday, 8:30 PM"
      }
    ]
  },
  {
    id: "3",
    patient: "Emma Wilson",
    patientId: "PT-56789",
    lastMessage: "Thank you for the prescription. When should I start taking it?",
    time: "Yesterday",
    unread: false,
    urgent: false,
    messages: [
      {
        sender: 'doctor',
        content: "Emma, I've sent over your prescription renewal. You should be able to pick it up today.",
        time: "Yesterday, 2:15 PM"
      },
      {
        sender: 'patient',
        content: "Thank you for the prescription. When should I start taking it?",
        time: "Yesterday, 3:40 PM"
      }
    ]
  },
  {
    id: "4",
    patient: "Robert Thompson",
    patientId: "PT-45678",
    lastMessage: "The lab results look better than last time. I'll continue with the current treatment plan.",
    time: "Apr 20",
    unread: false,
    urgent: false,
    messages: [
      {
        sender: 'patient',
        content: "Dr. Johnson, I got my lab results back. Should I send them to you?",
        time: "Apr 20, 11:30 AM"
      },
      {
        sender: 'doctor',
        content: "Yes, please send them through the secure portal.",
        time: "Apr 20, 12:15 PM"
      },
      {
        sender: 'patient',
        content: "I've uploaded them. Let me know what you think.",
        time: "Apr 20, 1:05 PM"
      },
      {
        sender: 'doctor',
        content: "The lab results look better than last time. I'll continue with the current treatment plan.",
        time: "Apr 20, 3:25 PM"
      }
    ]
  }
];

export default Messages;
