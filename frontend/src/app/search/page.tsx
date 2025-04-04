import { Metadata } from 'next';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Search Results | Chi Voyage',
  description: 'Search results for places in Chicago',
};

export default function SearchPage() {
  return <SearchClient />;
} 