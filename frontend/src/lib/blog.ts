import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';
import { Metadata } from 'next';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  heroImage?: string;
  metadata: Metadata;
}

export function getAllBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter(fileName => fileName.endsWith('.html'))
    .map(fileName => {
      const slug = fileName.replace(/\.html$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return parseBlogPost(fileContents, slug);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(process.cwd(), 'content/blog', `${slug}.html`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return parseBlogPost(fileContents, slug);
  } catch {
    return null;
  }
}

function parseBlogPost(html: string, slug: string): BlogPost {
  const root = parse(html);
  
  // Extract metadata from meta tags
  const title = root.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                root.querySelector('title')?.text || '';
  const description = root.querySelector('meta[property="og:description"]')?.getAttribute('content') || 
                     root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const date = root.querySelector('meta[property="article:published_time"]')?.getAttribute('content') || 
               new Date().toISOString();
  const category = root.querySelector('meta[property="article:section"]')?.getAttribute('content') || 'Uncategorized';
  const readTime = root.querySelector('meta[name="read-time"]')?.getAttribute('content') || '5 min read';
  
  // Extract hero image if present
  const heroImage = root.querySelector('article img')?.getAttribute('src') || undefined;
  
  // Extract the main content
  const article = root.querySelector('article');
  if (!article) {
    throw new Error('No article content found in blog post');
  }
  
  // Remove the hero image from the content if it exists
  const heroImageElement = article.querySelector('img');
  if (heroImageElement) {
    heroImageElement.remove();
  }
  
  const content = article.toString();
  
  // Create metadata object
  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      section: category,
      images: heroImage ? [heroImage] : undefined,
    },
  };
  
  return {
    slug,
    title,
    description,
    date,
    category,
    readTime,
    content,
    heroImage,
    metadata,
  };
} 