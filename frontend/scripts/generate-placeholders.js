const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const PLACEHOLDERS = {
  'placeholder-skyline.jpg': {
    width: 1920,
    height: 1080,
    text: 'Chicago Skyline',
    color: '#1a365d'
  },
  'placeholder-category.jpg': {
    width: 800,
    height: 600,
    text: 'Category Image',
    color: '#2d3748'
  },
  'placeholder-featured.jpg': {
    width: 800,
    height: 600,
    text: 'Featured Image',
    color: '#2c5282'
  }
};

const PLACEHOLDER_DIR = path.join(process.cwd(), 'public', 'images');

// Ensure the directory exists
if (!fs.existsSync(PLACEHOLDER_DIR)) {
  fs.mkdirSync(PLACEHOLDER_DIR, { recursive: true });
}

Object.entries(PLACEHOLDERS).forEach(([filename, config]) => {
  const canvas = createCanvas(config.width, config.height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = config.color;
  ctx.fillRect(0, 0, config.width, config.height);

  // Add text
  ctx.fillStyle = '#ffffff';
  ctx.font = `${config.width * 0.05}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(config.text, config.width / 2, config.height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(PLACEHOLDER_DIR, filename), buffer);
  console.log(`Generated ${filename}`);
}); 