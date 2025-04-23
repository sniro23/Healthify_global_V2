
import { Button } from '@healthify/ui';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Healthify Patient Portal</h1>
      <Button variant="health">Get Started</Button>
    </main>
  );
}

