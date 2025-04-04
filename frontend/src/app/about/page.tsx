import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Chi Voyage - Discover Chicago\'s Best',
  description: 'Learn about Chi Voyage\'s mission to help you discover the best places in Chicago, from restaurants and attractions to activities and events.',
};

export default function AboutPage() {
  return <AboutClient />;
} 