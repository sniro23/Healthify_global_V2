/**
 * Supabase client for the FHIR server
 * Note: This is a placeholder implementation. In a real app, you would:
 * 1. Install and use the actual Supabase client
 * 2. Configure it with your project's URL and key
 */
export declare const supabase: {
    from: (table: string) => {
        insert: (data: any) => Promise<{
            data: any;
            error: null;
        }>;
        select: (columns?: string) => {
            eq: (column: string, value: any) => {
                eq: (anotherColumn: string, anotherValue: any) => {
                    order: (orderBy: string, { ascending }?: {
                        ascending?: boolean | undefined;
                    }) => Promise<{
                        data: never[];
                        error: null;
                    }>;
                };
                order: (orderBy: string, { ascending }?: {
                    ascending?: boolean | undefined;
                }) => Promise<{
                    data: never[];
                    error: null;
                }>;
            };
        };
    };
};
//# sourceMappingURL=supabase.d.ts.map