#!/usr/bin/env node

/**
 * Script to add Vercel Web Analytics to all HTML files
 * This script inserts the analytics script tag in the <head> section of each HTML file
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const analyticsScript = `
    <!-- Vercel Web Analytics -->
    <script defer src="https://cdn.vercel-insights.com/v1/script.js"></script>
`;

async function addAnalyticsToHTML() {
  try {
    // Find all HTML files in the root directory
    const htmlFiles = await glob('*.html', { 
      ignore: ['node_modules/**', 'dist/**', 'build/**'] 
    });

    console.log(`Found ${htmlFiles.length} HTML files to process\n`);

    let modifiedCount = 0;
    let skippedCount = 0;

    for (const file of htmlFiles) {
      try {
        let content = fs.readFileSync(file, 'utf8');

        // Check if analytics script is already present
        if (content.includes('cdn.vercel-insights.com')) {
          console.log(`✓ Skipped ${file} (already has analytics)`);
          skippedCount++;
          continue;
        }

        // Try to insert before </head> tag
        if (content.includes('</head>')) {
          content = content.replace('</head>', `${analyticsScript}\n  </head>`);
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Added analytics to ${file}`);
          modifiedCount++;
        } else {
          console.log(`⚠ Warning: No </head> tag found in ${file}`);
        }
      } catch (error) {
        console.error(`✗ Error processing ${file}:`, error.message);
      }
    }

    console.log(`\n✅ Complete! Modified ${modifiedCount} files, skipped ${skippedCount} files`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addAnalyticsToHTML();
