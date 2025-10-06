#!/usr/bin/env node

/**
 * Migration script to update import paths to use the new structure
 * Run with: node scripts/migrate-imports.js
 */

const fs = require('fs');
const path = require('path');

const importMappings = {
  // Old path -> New path
  'from \'@/lib/utils\'': 'from \'@/lib/utils\'', // Already correct
  'from \'@/hooks/use-toast\'': 'from \'@/hooks\'',
  'from \'../lib/utils\'': 'from \'@/lib/utils\'',
  'from \'../../lib/utils\'': 'from \'@/lib/utils\'',
  'from \'../../../lib/utils\'': 'from \'@/lib/utils\'',
  'from \'./lib/utils\'': 'from \'@/lib/utils\'',
};

function updateImportsInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  for (const [oldImport, newImport] of Object.entries(importMappings)) {
    if (content.includes(oldImport)) {
      content = content.replace(new RegExp(oldImport, 'g'), newImport);
      updated = true;
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated imports in: ${filePath}`);
  }
}

function walkDirectory(dir, callback) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      walkDirectory(filePath, callback);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      callback(filePath);
    }
  }
}

console.log('Starting import migration...');
walkDirectory('.', updateImportsInFile);
console.log('Import migration completed!');