const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src/app/admin', function(filePath) {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove the next-auth import
    content = content.replace(/import\s*{\s*getServerSession\s*}\s*from\s*['"]next-auth['"]/g, '');

    // Add getServerSession to the @/lib/auth import
    if (content.includes('import { authOptions } from "@/lib/auth"')) {
      content = content.replace(
        'import { authOptions } from "@/lib/auth"', 
        'import { authOptions, getServerSession } from "@/lib/auth"'
      );
    } else if (!content.includes('getServerSession')) {
       // if not there, add it
    }

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
