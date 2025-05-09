import { expect, describe, it, beforeEach } from '@jest/globals';
import { encrypt, decrypt } from './encryption';

describe('Encryption Utility', () => {
  const testMessage = 'Hello, this is a test message!';

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should encrypt and decrypt a message successfully', async () => {
    // Encrypt the message
    const encrypted = await encrypt(testMessage);
    
    // Verify the encrypted message is different from the original
    expect(encrypted).not.toEqual(testMessage);
    
    // Decrypt the message
    const decrypted = await decrypt(encrypted);
    
    // Verify the decrypted message matches the original
    expect(decrypted).toEqual(testMessage);
  });

  it('should generate different encrypted values for the same message', async () => {
    // Encrypt the same message twice
    const encrypted1 = await encrypt(testMessage);
    const encrypted2 = await encrypt(testMessage);
    
    // Verify the encrypted values are different (due to random IV)
    expect(encrypted1).not.toEqual(encrypted2);
    
    // Verify both can be decrypted to the original message
    expect(await decrypt(encrypted1)).toEqual(testMessage);
    expect(await decrypt(encrypted2)).toEqual(testMessage);
  });

  it('should handle empty messages', async () => {
    const emptyMessage = '';
    const encrypted = await encrypt(emptyMessage);
    const decrypted = await decrypt(encrypted);
    expect(decrypted).toEqual(emptyMessage);
  });

  it('should handle special characters', async () => {
    const specialMessage = '!@#$%^&*()_+{}|:"<>?~`-=[]\\;\',./';
    const encrypted = await encrypt(specialMessage);
    const decrypted = await decrypt(encrypted);
    expect(decrypted).toEqual(specialMessage);
  });

  it('should handle long messages', async () => {
    const longMessage = 'A'.repeat(1000);
    const encrypted = await encrypt(longMessage);
    const decrypted = await decrypt(encrypted);
    expect(decrypted).toEqual(longMessage);
  });

  it('should throw error when decrypting invalid data', async () => {
    const invalidData = 'invalid-base64-data';
    await expect(decrypt(invalidData)).rejects.toThrow('Failed to decrypt message');
  });

  it('should maintain encryption key across sessions', async () => {
    // First encryption
    const encrypted1 = await encrypt(testMessage);
    
    // Simulate page reload by clearing everything except localStorage
    const keyString = localStorage.getItem('encryptionKey');
    localStorage.clear();
    localStorage.setItem('encryptionKey', keyString!);
    
    // Second encryption
    const encrypted2 = await encrypt(testMessage);
    
    // Both should be decryptable
    expect(await decrypt(encrypted1)).toEqual(testMessage);
    expect(await decrypt(encrypted2)).toEqual(testMessage);
  });
}); 