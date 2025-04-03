import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }
  
  try {
    // Generate a unique filename based on the URL
    const urlHash = crypto.createHash('md5').update(url).digest('hex');
    const fileExtension = path.extname(url) || '.jpg';
    const fileName = `${urlHash}${fileExtension}`;
    
    // Define the local path
    const publicDir = path.join(process.cwd(), 'public', 'images', 'places');
    const localPath = path.join(publicDir, fileName);
    const publicPath = `/images/places/${fileName}`;
    
    // Check if the image already exists
    if (fs.existsSync(localPath)) {
      return NextResponse.json({ localPath: publicPath });
    }
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Download the image
    await new Promise<void>((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }
        
        const fileStream = fs.createWriteStream(localPath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(localPath, () => {}); // Delete the file if there was an error
          reject(err);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
    
    return NextResponse.json({ localPath: publicPath });
  } catch (error) {
    console.error('Error proxying image:', error);
    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 });
  }
} 