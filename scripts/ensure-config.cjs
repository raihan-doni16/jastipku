const fs = require('fs');
const path = require('path');

const configPath = path.join(process.cwd(), '.vercel', 'output', 'config.json');
const dir = path.dirname(configPath);

// Ensure directory exists
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Create config.json if it doesn't exist
if (!fs.existsSync(configPath)) {
  console.log('Creating missing config.json at:', configPath);
  const config = {
    version: 3,
    routes: [
      {
        src: '/.*',
        dest: '/![-]/catchall'
      }
    ]
  };
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('config.json created successfully');
} else {
  console.log('config.json already exists');
}
