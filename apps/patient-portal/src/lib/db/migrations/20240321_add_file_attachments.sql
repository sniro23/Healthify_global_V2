-- Add file attachment columns to messages table
ALTER TABLE messages
ADD COLUMN has_attachment BOOLEAN DEFAULT FALSE,
ADD COLUMN attachment_name TEXT,
ADD COLUMN attachment_type TEXT,
ADD COLUMN attachment_size INTEGER,
ADD COLUMN encrypted_attachment TEXT;

-- Create index for faster attachment lookups
CREATE INDEX idx_messages_has_attachment ON messages(has_attachment);

-- Add trigger to update updated_at timestamp for attachments
CREATE OR REPLACE FUNCTION update_message_attachment()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.has_attachment = TRUE THEN
        NEW.updated_at = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_message_attachment_timestamp
    BEFORE UPDATE ON messages
    FOR EACH ROW
    WHEN (NEW.has_attachment = TRUE)
    EXECUTE FUNCTION update_message_attachment(); 