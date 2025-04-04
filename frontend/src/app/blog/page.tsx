import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog | Chi Voyage',
  description: 'Discover Chicago through our blog. Read about the best places to visit, eat, and explore in the city.',
};

export default function BlogPage() {
  return <BlogClient />;
} 