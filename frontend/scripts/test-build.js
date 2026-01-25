#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Testing Artify Bharat build...\n');

try {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    console.log('\n🔧 Building project...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('\n✅ Build successful! Project is ready to run.');
    console.log('\n📋 Available commands:');
    console.log('  npm run dev     - Start development server');
    console.log('  npm run start   - Start production server');
    console.log('  npm run lint    - Run linting');

} catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
}