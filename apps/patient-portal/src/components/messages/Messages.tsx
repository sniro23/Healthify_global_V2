'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle, Search, Plus, User, Send } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@healthify/ui-kit';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@healthify/ui-kit/auth-module';
import MessageCard from './MessageCard';
import ChatDetail from './ChatDetail';
import NewChatForm from './NewChatForm';
import useChat from '../../hooks/useChat';

// Define types
interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_type: string;
  sender_name: string;
  recipient_id: string;
  recipient_type: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ongoing');
  const [showNewChat, setShowNewChat] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [showChatDetail, setShowChatDetail] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { messages, archivedMessages, sendMessage, markAsRead } = useChat(selectedRecipientId || '');
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  
  // Filter messages based on search term
  const filteredMessages = searchTerm 
    ? messages.filter(msg => 
        msg.sender_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages;
    
  const filteredArchived = searchTerm 
    ? archivedMessages.filter(msg => 
        msg.sender_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : archivedMessages;
  
  useEffect(() => {
    // When a message is selected, mark it as read and show chat detail on mobile
    if (selectedMessage) {
      const message = [...messages, ...archivedMessages].find(msg => msg.id === selectedMessage);
      if (message) {
        setSelectedRecipientId(message.recipient_id);
        markAsRead(selectedMessage);
        if (window.innerWidth < 1024) {
          setShowChatDetail(true);
        }
      }
    }
  }, [selectedMessage, markAsRead, messages, archivedMessages]);
  
  const handleBack = () => {
    setShowChatDetail(false);
    setShowNewChat(false);
    setSelectedMessage(null);
    setSelectedRecipientId(null);
  };
  
  const renderMessages = (messages: Message[]) => (
    messages.length > 0 ? (
      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} onClick={() => setSelectedMessage(msg.id)}>
            <MessageCard 
              message={{
                id: msg.id,
                from: msg.sender_name,
                date: new Date(msg.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                }),
                preview: msg.content,
                unread: !msg.is_read
              }}
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
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-health-primary" />
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
                variant={activeTab === "ongoing" ? "primary" : "outline"}
                className={`flex-1 ${activeTab === "ongoing" ? "bg-health-primary" : ""}`}
                onClick={() => setActiveTab("ongoing")}
              >
                Ongoing
              </Button>
              <Button
                variant={activeTab === "archived" ? "primary" : "outline"}
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
          
          {/* Message list */}
          {showNewChat ? (
            <NewChatForm 
              onCancel={() => setShowNewChat(false)}
              onSubmit={(recipientId: string, message: string) => {
                setSelectedRecipientId(recipientId);
                sendMessage(message);
                setShowNewChat(false);
              }}
            />
          ) : (
            activeTab === "ongoing" ? renderMessages(filteredMessages) : renderMessages(filteredArchived)
          )}
        </div>
        
        {/* Chat detail view */}
        <div className={`${showChatDetail ? 'block' : 'hidden lg:block'} lg:w-2/3`}>
          {selectedMessage ? (
            <ChatDetail 
              conversationId={selectedMessage}
              onBack={handleBack}
            />
          ) : (
            <div className="h-full flex items-center justify-center p-8 bg-gray-50 rounded-lg">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Conversation Selected</h3>
                <p className="text-gray-500">
                  Select a conversation from the list or start a new one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 