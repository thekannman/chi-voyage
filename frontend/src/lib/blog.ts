import fs from 'fs';
// import { readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  heroImage?: string;
  keywords?: string[];
}

export interface BlogListData {
  slug: string;
  frontmatter: BlogPostFrontmatter;
}

export interface BlogPostData {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllBlogPosts(): BlogListData[] {
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error("Error reading blog posts directory:", postsDirectory, error);
    return [];
  }
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      
      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        const frontmatter = data as BlogPostFrontmatter;

        if (!frontmatter.title || !frontmatter.date || !frontmatter.category || !frontmatter.description || !frontmatter.readTime) {
            console.warn(`Post "${slug}" is missing required frontmatter fields.`);
            return null;
        }
        
        return {
          slug,
          frontmatter,
        };
      } catch (error) {
          console.error(`Error processing post "${slug}":`, error);
          return null;
      }
    })
    .filter((post): post is BlogListData => post !== null);

  return allPostsData.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPostData | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as BlogPostFrontmatter;

    if (!frontmatter.title || !frontmatter.date || !frontmatter.category || !frontmatter.description || !frontmatter.readTime) {
        console.warn(`Post "${slug}" is missing required frontmatter fields.`);
        return null;
    }

    return {
      slug,
      frontmatter,
      content,
    };
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        console.log(`Blog post not found for slug: ${slug}`);
    } else {
        console.error(`Error reading blog post for slug "${slug}":`, error);
    }
    return null;
  }
} 