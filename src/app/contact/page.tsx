import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '@/components/contact-form';

export const metadata = {
  title: 'Contact Us | Sawarn Empire',
  description: 'Get in touch with Sawarn Empire for any inquiries.',
};

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 md:py-24">
        <div className="mb-12 text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="mt-2 text-lg text-muted-foreground">We'd love to hear from you. Reach out with any questions.</p>
        </div>
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground">General Inquiries</p>
                <a href="mailto:contact@sawarnempire.com" className="text-primary hover:underline">
                  contact@sawarnempire.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-xl font-semibold">Phone</h3>
                <p className="text-muted-foreground">Call our team</p>
                <a href="tel:+1234567890" className="text-primary hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-xl font-semibold">Office</h3>
                <p className="text-muted-foreground">123 Elegance Drive</p>
                <p className="text-muted-foreground">Beverly Hills, CA 90210</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-8 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
