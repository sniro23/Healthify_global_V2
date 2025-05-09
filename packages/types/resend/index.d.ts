declare module 'resend' {
  export interface SendEmailParams {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    cc?: string | string[];
    bcc?: string | string[];
    reply_to?: string;
    headers?: Record<string, string>;
    attachments?: Array<{
      filename: string;
      content: Buffer | string;
      contentType?: string;
    }>;
  }

  export interface SendEmailResponse {
    id: string;
    from: string;
    to: string | string[];
    created: string;
  }

  export class Resend {
    constructor(apiKey: string);
    emails: {
      send: (params: SendEmailParams) => Promise<SendEmailResponse>;
    };
  }
}
