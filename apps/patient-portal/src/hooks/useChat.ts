import { useState, useEffect, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User } from '@supabase/supabase-js';
import { useAuth } from '@healthify/ui-kit/auth-module';
import { encrypt, decrypt, encryptFile, decryptFile } from '../lib/encryption';

// Message types
export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_type: 'patient' | 'doctor';
  sender_name: string;
  recipient_id: string;
  recipient_type: 'patient' | 'doctor';
  content: string;
  encrypted_content: string;
  has_attachment: boolean;
  attachment_name?: string;
  attachment_type?: string;
  attachment_size?: number;
  encrypted_attachment?: string;
  created_at: string;
  is_read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'patient' | 'doctor' | 'system';
  text: string;
  time: string;
}

export interface Chat {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  messages: ChatMessage[];
}

interface Conversation {
  id: string;
  messages: Message[];
  is_archived: boolean;
}

export const useChat = (recipientId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [archivedMessages, setArchivedMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Record<string, Chat>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { user } = useAuth();
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  
  const name = user?.email?.split('@')[0] || 'Anonymous';
  
  // Subscribe to real-time message updates
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${recipientId}`,
        },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMessage = payload.new as Message;
            // Decrypt the message content
            const decryptedContent = await decrypt(newMessage.encrypted_content);
            newMessage.content = decryptedContent;
            
            setMessages(prev => [...prev, newMessage]);
            
            // Update chat details
            const chat = await getChatDetails(recipientId);
            if (chat) {
              setChats(prev => ({
                ...prev,
                [recipientId]: chat,
              }));
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedMessage = payload.new as Message;
            setMessages(prev =>
              prev.map(msg =>
                msg.id === updatedMessage.id ? updatedMessage : msg
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, recipientId, supabase]);
  
  // Fetch messages for the current user
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // Get all conversations where the user is a participant
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
          .order('created_at', { ascending: false });
          
        if (error) throw error;

        // Decrypt messages
        const decryptedMessages = await Promise.all(
          data.map(async (msg) => {
            const decryptedContent = await decrypt(msg.encrypted_content);
            return { ...msg, content: decryptedContent };
          })
        );
        
        setMessages(decryptedMessages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch messages'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
  }, [user, supabase]);
  
  // Get chat details
  const getChatDetails = useCallback(async (conversationId: string) => {
    if (!user || !conversationId) return null;
    
    try {
      // Check if we've already loaded this chat
      if (chats[conversationId]) {
        return chats[conversationId];
      }
      
      // Get all messages for this conversation
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Decrypt messages
        const decryptedData = await Promise.all(
          data.map(async (msg) => {
            const decryptedContent = await decrypt(msg.encrypted_content);
            return { ...msg, content: decryptedContent };
          })
        );

        // Determine the participant
        const otherParticipant = decryptedData[0].sender_id === user.id 
          ? { 
              id: decryptedData[0].recipient_id, 
              name: decryptedData[0].recipient_name,
              role: decryptedData[0].recipient_type 
            }
          : { 
              id: decryptedData[0].sender_id, 
              name: decryptedData[0].sender_name,
              role: decryptedData[0].sender_type 
            };
            
        // Format chat messages
        const chatMessages = decryptedData.map(msg => ({
          id: msg.id,
          sender: msg.sender_id === user.id ? 'patient' : msg.sender_type,
          text: msg.content,
          time: new Date(msg.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        }));
        
        const chat: Chat = {
          id: conversationId,
          participant: {
            id: otherParticipant.id,
            name: otherParticipant.role === 'doctor' ? 'Dr. ' + otherParticipant.name : otherParticipant.name,
            role: otherParticipant.role
          },
          messages: chatMessages
        };
        
        // Update chats state
        setChats(prevChats => ({
          ...prevChats,
          [conversationId]: chat
        }));
        
        return chat;
      }
      
      return null;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch chat details'));
      return null;
    }
  }, [user, chats, supabase]);
  
  // Mark a message as read
  const markAsRead = useCallback(async (messageId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId);
        
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to mark message as read'));
    }
  }, [user, supabase]);
  
  // Send a new message with optional file attachment
  const sendMessage = useCallback(async (msg: string, file?: File) => {
    if (!user || !recipientId) return;
    
    try {
      // Encrypt the message content
      const encryptedContent = await encrypt(msg);
      
      const newMessage: Omit<Message, 'id'> = {
        conversation_id: recipientId,
        sender_id: user.id,
        sender_type: 'patient',
        sender_name: name,
        recipient_id: recipientId,
        recipient_type: 'doctor',
        content: msg,
        encrypted_content: encryptedContent,
        has_attachment: !!file,
        created_at: new Date().toISOString(),
        is_read: false
      };

      // If there's a file, encrypt it and add to message
      if (file) {
        const { encryptedData, name, type, size } = await encryptFile(file);
        newMessage.attachment_name = name;
        newMessage.attachment_type = type;
        newMessage.attachment_size = size;
        newMessage.encrypted_attachment = encryptedData;
      }
      
      const { error } = await supabase
        .from('messages')
        .insert([newMessage]);
        
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send message'));
    }
  }, [user, recipientId, name, supabase]);
  
  // Download an attachment
  const downloadAttachment = useCallback(async (message: Message) => {
    if (!message.has_attachment || !message.encrypted_attachment || !message.attachment_type) {
      throw new Error('No attachment found');
    }

    try {
      const decryptedBlob = await decryptFile(
        message.encrypted_attachment,
        message.attachment_type
      );

      // Create download link
      const url = URL.createObjectURL(decryptedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = message.attachment_name || 'attachment';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to download attachment'));
    }
  }, []);
  
  // Archive a conversation
  const archiveConversation = useCallback(async (conversationId: string) => {
    if (!user) return;
    
    try {
      // Archive all messages in this conversation
      const { error } = await supabase
        .from('messages')
        .update({ archived: true })
        .eq('conversation_id', conversationId)
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`);
      
      if (error) throw error;
      
      // Update local state
      const messageToArchive = messages.find(msg => msg.id === conversationId);
      
      if (messageToArchive) {
        setMessages(prevMessages => 
          prevMessages.filter(msg => msg.id !== conversationId)
        );
        
        setArchivedMessages(prevArchived => [messageToArchive, ...prevArchived]);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to archive conversation'));
    }
  }, [messages, supabase, user]);
  
  return {
    messages,
    archivedMessages,
    chats,
    loading,
    error,
    getChatDetails,
    markAsRead,
    sendMessage,
    archiveConversation,
    downloadAttachment
  };
};

export default useChat; 