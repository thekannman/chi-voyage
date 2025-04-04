import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Chi Voyage',
  description: 'Get in touch with the Chi Voyage team. We\'re here to help you discover the best of Chicago.',
};

export default function ContactPage() {
  return <ContactClient />;
} 