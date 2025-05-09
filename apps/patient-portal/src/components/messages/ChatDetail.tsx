'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@healthify/ui-kit';
import { useAuth } from '@healthify/ui-kit/auth-module';
import useChat from '../../hooks/useChat';

interface ChatDetailProps {
  conversationId: string;
  onBack: () => void;
}

export default function ChatDetail({ conversationId, onBack }: ChatDetailProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { chats, sendMessage } = useChat(conversationId);
  const chat = chats[conversationId];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  if (!chat) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="lg:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardHeader className="flex flex-row items-center gap-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack} className="lg:hidden">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <CardTitle>{chat.participant.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[calc(100%-8rem)]">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-4">
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'patient'
                      ? 'bg-health-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'patient' ? 'text-white/70' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 min-w-0 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-health-primary focus:border-transparent"
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="bg-health-primary hover:bg-health-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 