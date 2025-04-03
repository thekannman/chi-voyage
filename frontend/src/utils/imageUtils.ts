import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';

/**
 * Downloads an image from a URL and saves it to the local filesystem
 * @param imageUrl The URL of the image to download
 * @returns The local path to the downloaded image
 */
export async function downloadAndSaveImage(imageUrl: string): Promise<string> {
  // Generate a unique filename based on the URL
  const urlHash = crypto.createHash('md5').update(imageUrl).digest('hex');
  const fileExtension = path.extname(imageUrl) || '.jpg';
  const fileName = `${urlHash}${fileExtension}`;
  
  // Define the local path
  const publicDir = path.join(process.cwd(), 'public', 'images', 'places');
  const localPath = path.join(publicDir, fileName);
  
  // Check if the image already exists
  if (fs.existsSync(localPath)) {
    return `/images/places/${fileName}`;
  }
  
  // Create the directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Download the image
  return new Promise((resolve, reject) => {
    https.get(imageUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(localPath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(`/images/places/${fileName}`);
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(localPath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Processes an image URL, downloading it if it's external
 * @param imageUrl The URL of the image to process
 * @returns The local path to the image
 */
export async function processImageUrl(imageUrl: string): Promise<string> {
  // If it's already a local path, return it
  if (imageUrl.startsWith('/images/')) {
    return imageUrl;
  }
  
  // If it's an external URL, download it
  if (imageUrl.startsWith('http')) {
    try {
      return await downloadAndSaveImage(imageUrl);
    } catch (error) {
      console.error(`Failed to download image: ${imageUrl}`, error);
      // Return a default image if download fails
      return '/images/placeholder.jpg';
    }
  }
  
  // If it's a relative path, ensure it starts with /
  return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
} 