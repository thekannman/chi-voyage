import fs from 'fs';
import { readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogPostLayout from '@/components/Blog/BlogPostLayout';
import Link from 'next/link';
import { Category } from '../BlogClient';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  category: Category;
  readTime?: string;
  heroImage?: string;
  keywords?: string[];
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

function getPostData(slug: string): { frontmatter: Frontmatter; content: string } | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as Frontmatter;
    if (!frontmatter.title || !frontmatter.description || !frontmatter.category || !frontmatter.date) {
        console.warn(`Post "${slug}" is missing required frontmatter fields.`);
        return null;
    }
    return { frontmatter, content };

  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.log(`Blog post not found for slug: ${slug}`);
    } else {
      console.error(`Error reading blog post for slug "${slug}":`, error);
    }
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const filenames = await readdir(postsDirectory);
    return filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => ({
        slug: filename.replace(/\.mdx$/, ''),
      }));
  } catch (error) {
     console.error("Error reading blog directory for static params:", error);
     return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.'
    };
  }
  const { frontmatter } = postData;

  return {
    title: `${frontmatter.title} | Chi Voyage`,
    description: frontmatter.description,
    keywords: frontmatter.keywords || [],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      section: frontmatter.category,
      images: frontmatter.heroImage ? [frontmatter.heroImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postData = getPostData(slug);
  
  if (!postData) {
    notFound();
  }

  const { frontmatter, content } = postData;

  const layoutProps = {
    category: frontmatter.category,
    readTime: frontmatter.readTime || '',
    title: frontmatter.title,
    description: frontmatter.description,
    heroImageSrc: frontmatter.heroImage,
    heroImageAlt: frontmatter.title,
    relatedRestaurants: [],
    relatedNeighborhoods: [],
    relatedBlogPosts: [],
  };

  const components = {
    Link,
  };

  return (
    <BlogPostLayout {...layoutProps}>
      <MDXRemote source={content} components={components} />
    </BlogPostLayout>
  );
} 