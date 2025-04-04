import { Metadata } from 'next';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Careers | Chi Voyage',
  description: 'Join the Chi Voyage team and help us discover and share the best of Chicago.',
};

export default function CareersPage() {
  return <CareersClient />;
} 