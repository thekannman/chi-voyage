const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Path to the JSON file
const filePath = path.join(__dirname, '../data/Outscraper-20250402171751xs4c_restaurant_+2.json');

// Create a readable stream
const fileStream = fs.createReadStream(filePath);

// Create an interface to read the file line by line
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

// Track the structure of the JSON
const structure = {
  fields: new Set(),
  sampleValues: {},
  totalItems: 0
};

// Process the file line by line
let isFirstLine = true;
let isLastLine = false;
let buffer = '';

rl.on('line', (line) => {
  // Skip the first line if it's just an opening bracket
  if (isFirstLine && line.trim() === '[') {
    isFirstLine = false;
    return;
  }
  
  // Check if this is the last line (closing bracket)
  if (line.trim() === ']') {
    isLastLine = true;
    return;
  }
  
  // Remove trailing comma if present
  if (line.endsWith(',')) {
    line = line.slice(0, -1);
  }
  
  // Add to buffer
  buffer += line;
  
  // Try to parse the buffer as JSON
  try {
    const item = JSON.parse(buffer);
    analyzeItem(item);
    buffer = '';
  } catch (e) {
    // If parsing fails, continue accumulating in the buffer
    // This handles multi-line JSON objects
  }
});

rl.on('close', () => {
  // Print the results
  console.log('JSON Structure Analysis:');
  console.log('------------------------');
  console.log(`Total items analyzed: ${structure.totalItems}`);
  console.log('\nFields found:');
  
  // Convert Set to Array and sort
  const fields = Array.from(structure.fields).sort();
  
  fields.forEach(field => {
    console.log(`- ${field}`);
    if (structure.sampleValues[field]) {
      console.log(`  Sample value: ${structure.sampleValues[field]}`);
    }
  });
  
  // Write the results to a file
  const outputPath = path.join(__dirname, '../data/json-structure-analysis.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    totalItems: structure.totalItems,
    fields: fields,
    sampleValues: structure.sampleValues
  }, null, 2));
  
  console.log(`\nDetailed analysis saved to: ${outputPath}`);
});

function analyzeItem(item) {
  structure.totalItems++;
  
  // Analyze each field in the item
  for (const [key, value] of Object.entries(item)) {
    // Add the field to our set of fields
    structure.fields.add(key);
    
    // Store a sample value for this field (only for the first item)
    if (structure.totalItems === 1 && !structure.sampleValues[key]) {
      // For arrays or objects, just note the type
      if (Array.isArray(value)) {
        structure.sampleValues[key] = `Array with ${value.length} items`;
      } else if (typeof value === 'object' && value !== null) {
        structure.sampleValues[key] = 'Object';
      } else {
        structure.sampleValues[key] = String(value);
      }
    }
  }
} 