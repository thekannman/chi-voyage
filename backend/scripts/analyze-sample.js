const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/Outscraper-20250402171751xs4c_restaurant_+2.json');

// Read the first 10000 characters to get a sample
const sample = fs.readFileSync(filePath, 'utf8').slice(0, 10000);

// Find the first complete object
const firstBracket = sample.indexOf('[{');
const firstObjectEnd = sample.indexOf('},{');

if (firstBracket === -1 || firstObjectEnd === -1) {
    console.log('Could not find complete first object');
    process.exit(1);
}

// Get just the first object
const firstObject = sample.slice(firstBracket + 1, firstObjectEnd + 1);

try {
    const data = JSON.parse(firstObject);
    console.log('First Restaurant Analysis:');
    console.log('------------------------');
    
    // Print key fields that might be useful for the application
    const keyFields = {
        name: data.name,
        description: data.description,
        category: data.category,
        type: data.type,
        subtypes: data.subtypes,
        rating: data.rating,
        reviews: data.reviews,
        full_address: data.full_address,
        phone: data.phone,
        site: data.site,
        photos: {
            main: data.photo,
            count: data.photos_count
        },
        hours: data.working_hours,
        features: data.about,
        price_range: data.range
    };

    console.log(JSON.stringify(keyFields, null, 2));
    
} catch (error) {
    console.error('Error parsing JSON:', error.message);
    console.log('\nJSON that failed to parse:');
    console.log(firstObject);
} 