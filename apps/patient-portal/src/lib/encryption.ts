// Generate a key for encryption/decryption
const generateKey = async (): Promise<CryptoKey> => {
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
};

// Get or create encryption key
const getEncryptionKey = async (): Promise<CryptoKey> => {
  const keyString = localStorage.getItem('encryptionKey');
  if (keyString) {
    const keyData = JSON.parse(keyString);
    return await window.crypto.subtle.importKey(
      'jwk',
      keyData,
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  const key = await generateKey();
  const exportedKey = await window.crypto.subtle.exportKey('jwk', key);
  localStorage.setItem('encryptionKey', JSON.stringify(exportedKey));
  return key;
};

// Encrypt a message
export const encrypt = async (message: string): Promise<string> => {
  try {
    const key = await getEncryptionKey();
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    // Generate a random IV
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      data
    );

    // Combine IV and encrypted data
    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);

    // Convert to base64 string using Array.from
    return btoa(Array.from(encryptedArray)
      .map(byte => String.fromCharCode(byte))
      .join(''));
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt message');
  }
};

// Decrypt a message
export const decrypt = async (encryptedMessage: string): Promise<string> => {
  try {
    const key = await getEncryptionKey();

    // Convert base64 string back to Uint8Array
    const encryptedArray = new Uint8Array(
      atob(encryptedMessage)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    // Extract IV and encrypted data
    const iv = encryptedArray.slice(0, 12);
    const data = encryptedArray.slice(12);

    // Decrypt the data
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      data
    );

    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt message');
  }
};

// Encrypt a file
export const encryptFile = async (file: File): Promise<{ encryptedData: string; name: string; type: string; size: number }> => {
  try {
    const key = await getEncryptionKey();
    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    // Generate a random IV
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      data
    );

    // Combine IV and encrypted data
    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);

    // Convert to base64 string
    const encryptedBase64 = btoa(Array.from(encryptedArray)
      .map(byte => String.fromCharCode(byte))
      .join(''));

    return {
      encryptedData: encryptedBase64,
      name: file.name,
      type: file.type,
      size: file.size
    };
  } catch (error) {
    console.error('File encryption error:', error);
    throw new Error('Failed to encrypt file');
  }
};

// Decrypt a file
export const decryptFile = async (encryptedData: string, fileType: string): Promise<Blob> => {
  try {
    const key = await getEncryptionKey();

    // Convert base64 string back to Uint8Array
    const encryptedArray = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    // Extract IV and encrypted data
    const iv = encryptedArray.slice(0, 12);
    const data = encryptedArray.slice(12);

    // Decrypt the data
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      data
    );

    // Convert to Blob
    return new Blob([decryptedData], { type: fileType });
  } catch (error) {
    console.error('File decryption error:', error);
    throw new Error('Failed to decrypt file');
  }
}; 