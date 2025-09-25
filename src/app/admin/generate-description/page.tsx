import DescriptionGenerator from '@/components/description-generator';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'AI Property Description Generator | Sawarn Empire',
  description: 'Generate compelling property descriptions using AI.',
};

export default function GenerateDescriptionPage() {
  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 font-headline text-4xl font-bold md:text-5xl">AI Property Description Generator</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Enter property details below to automatically generate an engaging and professional listing description.
            </p>
        </div>
        <div className="rounded-xl bg-card p-8 shadow-lg">
          <DescriptionGenerator />
        </div>
      </div>
    </div>
  );
}
