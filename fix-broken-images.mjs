// FIX BROKEN IMAGES SCRIPT
// Replace 1-byte images with proper placeholders

import fs from 'fs';
import path from 'path';

const imagesDir = './src/assets/images';

// Create a simple placeholder image (base64 encoded 1x1 pixel)
const placeholderImage = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

// List of images to fix
const imagesToFix = [
    'avatar-christophe.jpg',
    'portfolio-preview.jpg',
    'stock2coat-poster.jpg',
    'stock2coat-demo.webm',
    'stock2coat-demo.gif'
];

console.log('🔧 Fixing broken images...');

imagesToFix.forEach(imageName => {
    const imagePath = path.join(imagesDir, imageName);
    
    try {
        // Check if file exists and is 1 byte
        if (fs.existsSync(imagePath)) {
            const stats = fs.statSync(imagePath);
            if (stats.size <= 1) {
                console.log(`❌ Fixing ${imageName} (${stats.size} bytes)`);
                
                // For images, use placeholder
                if (imageName.endsWith('.jpg') || imageName.endsWith('.png')) {
                    fs.writeFileSync(imagePath, placeholderImage);
                    console.log(`✅ Fixed ${imageName} with placeholder`);
                } else {
                    // For other files, create empty file with proper extension
                    fs.writeFileSync(imagePath, '');
                    console.log(`✅ Fixed ${imageName} with empty file`);
                }
            } else {
                console.log(`✅ ${imageName} is already OK (${stats.size} bytes)`);
            }
        } else {
            console.log(`⚠️ ${imageName} not found`);
        }
    } catch (error) {
        console.error(`❌ Error fixing ${imageName}:`, error.message);
    }
});

console.log('\n🎯 Next steps:');
console.log('1. Replace placeholder images with real photos');
console.log('2. Add your professional headshot as avatar-christophe.jpg');
console.log('3. Add portfolio preview screenshot as portfolio-preview.jpg');
console.log('4. Run Playwright audit again to verify fixes'); 