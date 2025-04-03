import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Downloads an image from a URL and returns it as a buffer
 */
async function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Uploads an image to Supabase storage and returns the public URL
 */
export async function uploadImageToSupabase(imageUrl: string, fileName: string): Promise<string> {
  try {
    console.log(`Downloading image from ${imageUrl}...`);
    // Download the image
    const imageBuffer = await downloadImage(imageUrl);
    console.log(`Downloaded image, size: ${imageBuffer.length} bytes`);
    
    // Upload to Supabase storage
    console.log(`Uploading to Supabase as ${fileName}...`);
    const { error } = await supabase.storage
      .from('chivoyage-images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('chivoyage-images')
      .getPublicUrl(fileName);
    
    console.log(`Upload successful, public URL: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image to Supabase:', error);
    throw error;
  }
} 