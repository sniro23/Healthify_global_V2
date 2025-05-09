export interface Message {
    id: string;
    from: string;
    date: string;
    preview: string;
    unread: boolean;
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
declare const useChat: () => {
    messages: Message[];
    archivedMessages: Message[];
    loading: boolean;
    error: Error | null;
    getChatDetails: (conversationId: string) => Promise<Chat | null>;
    sendMessage: (recipientId: string, content: string) => Promise<any>;
    markAsRead: (conversationId: string) => Promise<void>;
    archiveConversation: (conversationId: string) => Promise<void>;
};
export default useChat;
//# sourceMappingURL=useChat.d.ts.map