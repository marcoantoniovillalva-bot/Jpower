const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'galleria istagram');
const outputDir = path.join(__dirname, 'public/images');

const files = fs.readdirSync(inputDir);

files.forEach(file => {
  if (file.endsWith('.heic')) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.heic', '.webp'));
    
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => console.log(`Converted: ${file}`))
      .catch(err => console.error(`Error converting ${file}:`, err));
  }
});
