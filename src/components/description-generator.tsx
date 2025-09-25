'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { generateDescriptionAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Copy } from 'lucide-react';

const initialState = {
  message: '',
  description: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : <> <Sparkles className="mr-2 h-4 w-4" /> Generate Description </>}
    </Button>
  );
}

export default function DescriptionGenerator() {
  const [state, formAction] = useFormState(generateDescriptionAction, initialState);
  const [generatedDesc, setGeneratedDesc] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (state.description) {
      setGeneratedDesc(state.description);
    }
    if (state.message && state.errors) {
      toast({
        title: 'Error',
        description: 'Please check your inputs.',
        variant: 'destructive',
      });
    } else if (state.message && !state.description && !state.errors) {
        toast({
            title: 'Generation Failed',
            description: state.message,
            variant: 'destructive',
        });
    }
  }, [state, toast]);

  const handleCopy = () => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(generatedDesc);
        toast({
            title: 'Copied!',
            description: 'Description copied to clipboard.'
        });
    }
  }

  return (
    <div>
        <form action={formAction} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="propertyFeatures">Property Features</Label>
                <Textarea id="propertyFeatures" name="propertyFeatures" placeholder="e.g., 5 bedrooms, 6 bathrooms, open-plan living space, gourmet kitchen, hardwood floors, large windows, swimming pool, 3-car garage." required rows={4} />
                {state.errors?.propertyFeatures && <p className="text-sm text-destructive">{state.errors.propertyFeatures[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="propertyLocation">Property Location</Label>
                <Input id="propertyLocation" name="propertyLocation" placeholder="e.g., Beverly Hills, CA, quiet cul-de-sac" required />
                {state.errors?.propertyLocation && <p className="text-sm text-destructive">{state.errors.propertyLocation[0]}</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="proximityToParks">Proximity to Parks (Optional)</Label>
                    <Input id="proximityToParks" name="proximityToParks" placeholder="e.g., 5-minute walk to Central Park" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="neighborhoodQuality">Neighborhood Quality (Optional)</Label>
                    <Input id="neighborhoodQuality" name="neighborhoodQuality" placeholder="e.g., Top-rated school district, low crime rate" />
                </div>
            </div>
            <SubmitButton />
        </form>

        {generatedDesc && (
            <div className="mt-8">
                <Label className="font-headline text-lg font-semibold">Generated Description</Label>
                <Card className="relative mt-2 bg-secondary">
                    <CardContent className="p-6">
                        <p className="whitespace-pre-wrap text-secondary-foreground">{generatedDesc}</p>
                    </CardContent>
                    <Button variant="ghost" size="icon" onClick={handleCopy} className="absolute top-2 right-2 h-8 w-8">
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy text</span>
                    </Button>
                </Card>
            </div>
        )}
    </div>
  );
}
