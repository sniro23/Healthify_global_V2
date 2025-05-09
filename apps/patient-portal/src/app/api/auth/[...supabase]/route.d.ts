import { NextRequest, NextResponse } from 'next/server';
export declare function GET(request: NextRequest): Promise<NextResponse<unknown>>;
export declare function POST(request: NextRequest): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    data: {
        user: import("@supabase/auth-js").User | null;
        session: import("@supabase/auth-js").Session | null;
    };
}> | NextResponse<{
    success: boolean;
}>>;
//# sourceMappingURL=route.d.ts.map