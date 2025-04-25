'use client';

import React, { useState } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../card';
import { cn } from '../utils';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
  error?: string;
  className?: string;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export function LoginForm({ 
  onSubmit, 
  loading = false, 
  error, 
  className,
  onForgotPassword,
  onRegister
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await onSubmit(email, password);
    }
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-2xl text-center">Sign In</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {onForgotPassword && (
                <button 
                  type="button" 
                  onClick={onForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          {onRegister && (
            <div className="text-center text-sm">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={onRegister}
                className="text-blue-600 hover:text-blue-800"
              >
                Register
              </button>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
} 