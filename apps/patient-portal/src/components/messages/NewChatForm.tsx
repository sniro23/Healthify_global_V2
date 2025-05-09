'use client';

import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@healthify/ui-kit';

interface NewChatFormProps {
  onSubmit: (recipientId: string, initialMessage: string) => void;
  onCancel: () => void;
}

export default function NewChatForm({ onSubmit, onCancel }: NewChatFormProps) {
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipientId.trim() && message.trim()) {
      onSubmit(recipientId, message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="recipient"
              className="block text-sm font-medium text-gray-700"
            >
              Recipient
            </label>
            <select
              id="recipient"
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-health-primary focus:outline-none focus:ring-health-primary"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              required
            >
              <option value="">Select a recipient</option>
              {/* TODO: Replace with actual doctor list */}
              <option value="doctor1">Dr. John Smith</option>
              <option value="doctor2">Dr. Sarah Johnson</option>
              <option value="doctor3">Dr. Michael Brown</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-health-primary focus:outline-none focus:ring-health-primary"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-health-primary hover:bg-health-primary/90"
              disabled={!recipientId.trim() || !message.trim()}
            >
              Send Message
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 