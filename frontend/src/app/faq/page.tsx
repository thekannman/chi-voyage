import { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Chi Voyage',
  description: 'Find answers to frequently asked questions about Chi Voyage and how to use our platform.',
};

export default function FAQPage() {
  return <FAQClient />;
} 