'use server';

import { z } from 'zod';
import { generatePropertyDescription } from '@/ai/flows/generate-property-description';

export async function handleInquiry(prevState: any, formData: FormData) {
  const schema = z.object({
    propertyId: z.string(),
    propertyTitle: z.string(),
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    message: z.string().min(1, { message: 'Message is required' }),
  });

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return { message: 'Invalid form data.', errors: parsed.error.flatten().fieldErrors };
  }

  // In a real app, you would save this to a database or send an email.
  console.log('New Inquiry:', parsed.data);
  return { message: 'Thank you for your inquiry! We will get back to you shortly.', errors: null };
}

export async function handleContact(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    subject: z.string().min(1, { message: 'Subject is required' }),
    message: z.string().min(1, { message: 'Message is required' }),
  });

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return { message: 'Invalid form data.', errors: parsed.error.flatten().fieldErrors };
  }

  // In a real app, you would save this to a database or send an email.
  console.log('New Contact Message:', parsed.data);
  return { message: 'Thank you for your message! We will be in touch soon.', errors: null };
}

export async function generateDescriptionAction(prevState: any, formData: FormData) {
    const schema = z.object({
        propertyFeatures: z.string().min(1, 'Features are required'),
        propertyLocation: z.string().min(1, 'Location is required'),
        proximityToParks: z.string().optional(),
        neighborhoodQuality: z.string().optional(),
    });

    try {
        const parsed = schema.safeParse(Object.fromEntries(formData));
        if (!parsed.success) {
            return { message: 'Invalid input.', description: null, errors: parsed.error.flatten().fieldErrors };
        }

        const result = await generatePropertyDescription(parsed.data);
        return { message: 'Description generated successfully.', description: result.propertyDescription, errors: null };

    } catch (e) {
        console.error(e);
        return { message: 'An unexpected error occurred while generating the description.', description: null, errors: null };
    }
}
