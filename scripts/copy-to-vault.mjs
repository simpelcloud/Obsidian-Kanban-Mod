import fs from 'fs';
import path from 'path';

const PLUGIN_FILES = ['main.js', 'styles.css', 'manifest.json'];

function copyPluginFiles(targetDir) {
  if (!targetDir) {
    console.error('❌ Error: TARGET_PLUGIN_DIR environment variable or argument is required');
    console.error('Usage: TARGET_PLUGIN_DIR=/path/to/vault/.obsidian/plugins/obsidian-kanban pnpm dev');
    console.error('   or: node scripts/copy-to-vault.mjs /path/to/vault/.obsidian/plugins/obsidian-kanban');
    process.exit(1);
  }

  // Resolve to absolute path
  const targetPath = path.resolve(targetDir);
  
  // Ensure target directory exists
  if (!fs.existsSync(targetPath)) {
    console.log(`📁 Creating directory: ${targetPath}`);
    fs.mkdirSync(targetPath, { recursive: true });
  }

  // Copy each file
  let copiedCount = 0;
  for (const file of PLUGIN_FILES) {
    const sourcePath = path.join(process.cwd(), file);
    const destPath = path.join(targetPath, file);
    
    if (!fs.existsSync(sourcePath)) {
      console.warn(`⚠️  Source file not found: ${file}`);
      continue;
    }
    
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copied ${file} → ${targetPath}`);
    copiedCount++;
  }
  
  if (copiedCount === PLUGIN_FILES.length) {
    console.log(`\n🎉 Plugin files copied successfully to:`);
    console.log(`   ${targetPath}\n`);
    console.log('📝 Reload Obsidian (Ctrl/Cmd+P → "Reload app without saving") to see changes');
  } else {
    console.error(`\n❌ Only ${copiedCount}/${PLUGIN_FILES.length} files copied`);
    process.exit(1);
  }
}

// Get target directory from argument or environment variable
const targetDir = process.argv[2] || process.env.TARGET_PLUGIN_DIR;
copyPluginFiles(targetDir);
