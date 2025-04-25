import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogClient, { BlogPost, Category } from './BlogClient'; // Assuming BlogClient exports BlogPost type

// Define the expected structure of the frontmatter
interface Frontmatter {
  title: string;
  description: string;
  date: string; // Keep as string for now, can parse later if needed
  category: Category; // Use the imported Category type
  readTime?: string;
  keywords?: string[];
  heroImage?: string;
}

function getPostData(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  // console.log('[BlogPage] Trying to read from directory:', postsDirectory); // Removed log

  let filenames: string[];
  try {
    filenames = fs.readdirSync(postsDirectory);
    // console.log('[BlogPage] Found files:', filenames); // Removed log
  } catch (error) {
    console.error("[BlogPage] Error reading blog directory:", error);
    return []; // Return empty array if directory doesn't exist or can't be read
  }

  const posts = filenames
    .filter((filename) => filename.endsWith('.mdx')) // Only process .mdx files
    .map((filename): BlogPost | null => {
      const slug = filename.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, filename);
      // console.log(`[BlogPage] Processing file: ${fullPath}`); // Removed log
      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents); // Parse frontmatter
        // console.log(`[BlogPage] Parsed frontmatter for ${filename}:`, data); // Removed log

        // Validate frontmatter structure (basic validation)
        const frontmatter = data as Frontmatter;
        if (!frontmatter.title || !frontmatter.description || !frontmatter.category || !frontmatter.date) {
          // Keep this warning as it's useful for content errors
          console.warn(`[BlogPage] Skipping ${filename}: Missing required frontmatter fields.`);
          return null;
        }

        return {
          id: slug,
          title: frontmatter.title,
          excerpt: frontmatter.description, // Use description as excerpt
          category: frontmatter.category,
          image: frontmatter.heroImage, // Pass heroImage if available
          // Add date if needed for sorting/display, ensure BlogPost includes it
           date: frontmatter.date, 
        };
      } catch (error) {
        // Keep this error log
        console.error(`[BlogPage] Error processing file ${filename}:`, error);
        return null; // Skip files that cause errors
      }
    });

  // Filter out any null values from mapping (due to errors or missing fields)
  const validPosts = posts.filter((post): post is BlogPost => post !== null);
  
  // Sort posts by date, newest first
  validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return validPosts;
}


export default function BlogPage() {
  // console.log('[BlogPage] Rendering BlogPage...'); // Removed log
  const blogPosts = getPostData();
  // console.log(`[BlogPage] Passing ${blogPosts.length} posts to BlogClient.`); // Removed log

  // Pass the fetched data to the client component
  return <BlogClient blogPosts={blogPosts} />;
} 