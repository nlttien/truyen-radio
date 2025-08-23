// Simple client-side authentication without external JWT library

export interface User {
  id: string;
  username: string;
  email: string;
  preferences?: {
    voice?: string;
    speed?: number;
    volume?: number;
  };
}

// Simple user store (in-memory, no database)
const users: Record<string, { password: string; user: User }> = {
  'demo': {
    password: 'demo123',
    user: {
      id: '1',
      username: 'demo',
      email: 'demo@example.com',
      preferences: {
        voice: 'default',
        speed: 1,
        volume: 1
      }
    }
  }
};

// Simple token generation using base64 encoding
export function generateToken(user: User): string {
  const tokenData = {
    user,
    timestamp: Date.now(),
    expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  };
  return btoa(JSON.stringify(tokenData));
}

// Simple token verification using base64 decoding
export function verifyToken(token: string): User | null {
  try {
    const tokenData = JSON.parse(atob(token));
    if (tokenData.expires > Date.now()) {
      return tokenData.user;
    }
    return null; // Token expired
  } catch {
    return null; // Invalid token
  }
}

export function authenticate(username: string, password: string): User | null {
  const userRecord = users[username];
  if (userRecord && userRecord.password === password) {
    return userRecord.user;
  }
  return null;
}

export function registerUser(username: string, email: string, password: string): User | null {
  if (users[username]) {
    return null; // User already exists
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    username,
    email,
    preferences: {
      voice: 'default',
      speed: 1,
      volume: 1
    }
  };
  
  users[username] = { password, user: newUser };
  return newUser;
}
