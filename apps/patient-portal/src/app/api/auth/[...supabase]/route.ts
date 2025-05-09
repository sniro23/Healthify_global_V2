import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { action, email, password } = await request.json();
  
  switch (action) {
    case 'signUp':
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${request.headers.get('origin')}/auth/callback`,
        },
      });
      
      if (signUpError) {
        return NextResponse.json({ error: signUpError.message }, { status: 400 });
      }
      
      return NextResponse.json({ data: signUpData });
      
    case 'signIn':
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        return NextResponse.json({ error: signInError.message }, { status: 400 });
      }
      
      return NextResponse.json({ data: signInData });
      
    case 'signOut':
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) {
        return NextResponse.json({ error: signOutError.message }, { status: 400 });
      }
      
      return NextResponse.json({ success: true });
      
    case 'resetPassword':
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${request.headers.get('origin')}/auth/reset-password`,
      });
      
      if (resetError) {
        return NextResponse.json({ error: resetError.message }, { status: 400 });
      }
      
      return NextResponse.json({ success: true });
      
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
} 