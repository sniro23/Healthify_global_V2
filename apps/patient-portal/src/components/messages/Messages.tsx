'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle, Search, Plus, User, Send } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@healthify/ui-kit';
import { supabase } from '../../integrations/supabase/client';
import MessageCard from './MessageCard';

interface Message {
  id: string;
  from: string;
  date: string;
  preview: string;
  unread: boolean;
}

interface ChatMessage {
  id: number;
  sender: 'doctor' | 'patient';
  text: string;
  time: string;
}

interface Chat {
  doctor: string;
  specialty: string;
  messages: ChatMessage[];
}

// Mock data for initial UI
const mockMessages: Message[] = [
  {
    id: 'm1',
    from: 'Dr. Jane Smith',
    date: 'April 18th, 2025',
    preview: 'Your lab results are back and everything looks good.',
    unread: true,
  },
  {
    id: 'm2',
    from: 'Reception',
    date: 'April 10th, 2025',
    preview: 'Please remember to bring your insurance card to your next appointment.',
    unread: false,
  },
];

const mockArchivedMessages: Message[] = [
  {
    id: 'm3',
    from: 'Dr. Kevin Lee',
    date: 'March 5th, 2025',
    preview: 'Follow the treatment plan we discussed. Let me know if you have any questions.',
    unread: false,
  },
  {
    id: 'm4',
    from: 'Nurse Patel',
    date: 'February 20th, 2025',
    preview: 'Your prescription has been sent to the pharmacy.',
    unread: false,
  },
];

const mockChat: Chat = {
  doctor: 'Dr. Jane Smith',
  specialty: 'General Physician',
  messages: [
    {
      id: 1,
      sender: 'doctor',
      text: 'Hello John, how can I help you today?',
      time: '10:03 AM'
    },
    {
      id: 2,
      sender: 'patient',
      text: 'Hi Dr. Smith, I wanted to ask about my recent lab results.',
      time: '10:04 AM'
    },
    {
      id: 3,
      sender: 'doctor',
      text: 'Yes, I\'ve reviewed them and everything looks within normal ranges. Your cholesterol has improved since last time.',
      time: '10:06 AM'
    },
    {
      id: 4,
      sender: 'patient',
      text: 'That\'s good to hear. Should I continue with the same medication?',
      time: '10:07 AM'
    },
    {
      id: 5,
      sender: 'doctor',
      text: 'Yes, please continue with the current prescription. We\'ll review again in 3 months. Make sure to maintain your diet and exercise routine.',
      time: '10:09 AM'
    }
  ]
};

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ongoing');
  const [showNewChat, setShowNewChat] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>('m1');
  const [showChatDetail, setShowChatDetail] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [archivedMessages, setArchivedMessages] = useState(mockArchivedMessages);
  const [chat, setChat] = useState(mockChat);
  
  // Filter messages based on search term
  const filteredMessages = searchTerm 
    ? messages.filter(msg => 
        msg.from.toLowerCase().includes(searchTerm.toLowerCase()) || 
        msg.preview.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages;
    
  const filteredArchived = searchTerm 
    ? archivedMessages.filter(msg => 
        msg.from.toLowerCase().includes(searchTerm.toLowerCase()) || 
        msg.preview.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : archivedMessages;
  
  // Set up Supabase Realtime subscription
  useEffect(() => {
    // Create a channel for new messages
    const channel = supabase
      .channel('messages-channel')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages' 
        }, 
        (payload) => {
          // When a new message is received
          const newMessageData = payload.new as any;
          
          // If this message is part of the current chat, add it to the chat
          if (selectedMessage === 'm1') { // Assuming m1 is Dr. Jane Smith's conversation
            setChat(prevChat => ({
              ...prevChat,
              messages: [...prevChat.messages, {
                id: newMessageData.id,
                sender: newMessageData.sender_type,
                text: newMessageData.content,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }]
            }));
          }
          
          // Update the message preview in the messages list
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            const msgIndex = updatedMessages.findIndex(msg => msg.id === 'm1');
            
            if (msgIndex !== -1) {
              updatedMessages[msgIndex] = {
                ...updatedMessages[msgIndex],
                preview: newMessageData.content,
                date: new Date().toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                }),
                unread: updatedMessages[msgIndex].id !== selectedMessage
              };
            }
            
            return updatedMessages;
          });
        }
      )
      .subscribe();
    
    return () => {
      // Clean up subscription on component unmount
      supabase.removeChannel(channel);
    };
  }, [selectedMessage]);
  
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      // Get the current time
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Add message to the chat UI immediately for responsive feeling
      const newChatMessage: ChatMessage = {
        id: chat.messages.length + 1,
        sender: 'patient',
        text: newMessage,
        time: currentTime
      };
      
      setChat(prevChat => ({
        ...prevChat,
        messages: [...prevChat.messages, newChatMessage]
      }));
      
      // Clear the input
      setNewMessage('');
      
      // Send to Supabase
      await supabase.from('messages').insert({
        conversation_id: 'm1', // The ID for Dr. Jane Smith conversation
        sender_id: 'current-user-id', // Replace with actual user ID
        sender_type: 'patient',
        recipient_id: 'doctor-id', // Replace with actual doctor ID
        content: newMessage,
        read: false,
        created_at: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const renderMessages = (messages: Message[]) => (
    messages.length > 0 ? (
      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} onClick={() => setSelectedMessage(msg.id)}>
            <MessageCard 
              message={msg} 
              active={selectedMessage === msg.id}
            />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No messages found</p>
      </div>
    )
  );
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-health-primary" />
          Messages
        </h2>
        <Button className="bg-health-primary hover:bg-health-primary/90" onClick={() => {
          setShowNewChat(true);
          setShowChatDetail(false);
        }}>
          <Plus className="h-4 w-4 mr-2" /> New Message
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className={`${showChatDetail ? 'hidden lg:block' : ''} lg:w-1/3`}>
          <div className="mb-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant={activeTab === "ongoing" ? "default" : "outline"}
                className={`flex-1 ${activeTab === "ongoing" ? "bg-health-primary" : ""}`}
                onClick={() => setActiveTab("ongoing")}
              >
                Ongoing
              </Button>
              <Button
                variant={activeTab === "archived" ? "default" : "outline"}
                className={`flex-1 ${activeTab === "archived" ? "bg-health-primary" : ""}`}
                onClick={() => setActiveTab("archived")}
              >
                Archived
              </Button>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {showNewChat ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">New Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Recipient
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">Choose a healthcare provider</option>
                      <option value="dr-smith">Dr. Jane Smith - General Physician</option>
                      <option value="dr-patel">Dr. Amir Patel - Cardiologist</option>
                      <option value="reception">Reception/Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message Type
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="general">General Query</option>
                      <option value="appointment">Appointment Related</option>
                      <option value="prescription">Prescription Query</option>
                      <option value="results">Test Results Query</option>
                      <option value="emergency">Urgent Medical Question</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea 
                      className="w-full p-2 border rounded-md h-32" 
                      placeholder="Type your message here..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setShowNewChat(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="flex-1 bg-health-primary">
                      <Send className="h-4 w-4 mr-2" /> Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            activeTab === "ongoing" ? renderMessages(filteredMessages) : renderMessages(filteredArchived)
          )}
        </div>
        
        {showChatDetail && (
          <div className="lg:w-2/3">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-health-highlight flex items-center justify-center text-health-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>{chat.doctor}</CardTitle>
                    <p className="text-sm text-gray-500">{chat.specialty}</p>
                  </div>
                </div>
                <div className="lg:hidden">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowChatDetail(false)}
                  >
                    Back
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                <div className="space-y-4 mb-4 h-96 overflow-y-auto p-2">
                  {chat.messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === "doctor" ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "doctor" 
                          ? "bg-gray-100 text-gray-800" 
                          : "bg-health-primary text-white"
                      }`}>
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === "doctor" ? "text-gray-500" : "text-white/80"
                        }`}>{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full p-2 border rounded-l-md"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    className="bg-health-primary rounded-l-none"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 