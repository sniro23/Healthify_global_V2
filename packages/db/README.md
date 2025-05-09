# DB Package

This package provides database access utilities for the Healthify Global project.

## Features

- Supabase client for authentication and database access
- User model for working with user data
- TypeScript type definitions for database tables
- Utilities for logging and error handling

## Usage

### Authentication

```typescript
import { getSupabaseClient, signInWithEmail } from '@healthify/db';

const supabase = getSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Sign in
const { data, error } = await signInWithEmail(supabase, 'user@example.com', 'password');
```

### User Operations

```typescript
import { getSupabaseClient, getUserById, updateUser } from '@healthify/db';

const supabase = getSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Get user
const user = await getUserById(supabase, 'user-id');

// Update user
const updatedUser = await updateUser(supabase, 'user-id', { 
  name: 'New Name',
  email: 'new.email@example.com'
});
```

## Type Safety

This package leverages TypeScript to provide type safety for database operations. The types are generated from the database schema and available through the `Database` type.
