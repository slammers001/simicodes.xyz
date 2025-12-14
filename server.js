require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { PostHog } = require('posthog-node');
const app = express();
const PORT = 3000;

// Debug environment variables
console.log('Environment variables loaded:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Not set');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not set');
console.log('POSTHOG_API_KEY:', process.env.POSTHOG_API_KEY ? 'Set' : 'Not set');

// PostHog client
const posthog = new PostHog(
  'phc_dOBViKPhL2wwSDvkWprVr9vmD5L5303U10sVxcqda3T',
  { host: 'https://us.i.posthog.com' }
);

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(cors());
app.use(express.json());

// Serve static files but exclude web-apps directory
app.use((req, res, next) => {
  if (req.path.startsWith('/web-apps')) {
    return next();
  }
  express.static('public')(req, res, next);
});

// Projects data
const projects = {
  'stickee': {
    id: 'stickee',
    title: 'Stickee',
    description: 'A modern note-taking desktop application designed for simplicity and efficiency. Features clean interface with powerful organization capabilities.',
    type: 'desktop',
    tags: ['Electron', 'React', 'Node.js', 'TypeScript'],
    features: [
      'Modern note-taking interface',
      'Rich text formatting',
      'Search and organization',
      'Cross-platform desktop app',
      'Auto-save functionality',
      'Clean minimal design'
    ],
    github: 'https://github.com/slammers001/stickee'
  },
  'sleepyfox': {
    id: 'sleepyfox',
    title: 'Sleepyfox',
    description: 'A powerful image conversion desktop application that supports multiple formats and batch processing. Built for efficiency and ease of use.',
    type: 'desktop',
    tags: ['Electron', 'Node.js', 'Sharp', 'React'],
    features: [
      'Multiple image format support',
      'Batch processing capabilities',
      'Drag-and-drop interface',
      'Quality optimization',
      'Fast conversion speeds',
      'Preview functionality'
    ],
    github: 'https://github.com/slammers001/sleepyfox'
  }
};

// Graffiti wall data
let graffitiMessages = [];

// API Routes
app.get('/api/projects', (req, res) => {
  res.json(Object.values(projects));
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects[req.params.id];
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

// Graffiti wall API
app.get('/api/graffiti', (req, res) => {
  res.json(graffitiMessages);
});

app.post('/api/graffiti', (req, res) => {
  const { text, color, x, y, rotation } = req.body;
  
  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text is required' });
  }
  
  if (text.length > 100) {
    return res.status(400).json({ error: 'Text too long (max 100 characters)' });
  }
  
  const graffiti = {
    id: Date.now().toString(),
    text: text.trim(),
    color: color || '#000000',
    x: x || Math.random() * 80 + 10,
    y: y || Math.random() * 80 + 10,
    rotation: rotation || (Math.random() - 0.5) * 30,
    timestamp: new Date().toISOString()
  };
  
  graffitiMessages.push(graffiti);
  
  // Keep only last 50 messages
  if (graffitiMessages.length > 50) {
    graffitiMessages = graffitiMessages.slice(-50);
  }
  
  res.json(graffiti);
});

app.delete('/api/graffiti/:id', (req, res) => {
  const id = req.params.id;
  graffitiMessages = graffitiMessages.filter(g => g.id !== id);
  res.json({ success: true });
});

// Contact form API
app.post('/api/contact', async (req, res) => {
  const { email, github_username, message, location } = req.body;
  
  // Get client IP address from request headers
  const getClientIP = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    const realIP = req.headers['x-real-ip'];
    const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    } else if (realIP) {
      return realIP;
    } else {
      return clientIP;
    }
  };
  
  const clientIP = getClientIP(req) || 'Unknown';
  
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }
  
  // Basic email validation - requires @ and at least one dot after @
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }
  
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          email,
          github_username,
          message,
          location: clientIP, // Use server-side IP instead of client-side
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to save submission' });
    }
    
    // Track contact form submission in PostHog
    await posthog.capture({
      distinctId: email,
      event: 'contact_form_submitted',
      properties: {
        email: email,
        github_username: github_username || null,
        message_length: message.length,
        ip_address: clientIP,
        timestamp: new Date().toISOString()
      }
    });
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static assets for web apps
app.use('/web-apps/stickee/assets', express.static(path.join(__dirname, 'public', 'web-apps', 'stickee', 'assets')));

// Web app routes
app.get('/web-apps/stickee', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'web-apps', 'stickee', 'index.html'));
});

// Serve other static files in stickee directory (excluding index.html)
app.use('/web-apps/stickee', (req, res, next) => {
  if (req.path !== '/' && req.path.includes('.')) {
    const filePath = path.join(__dirname, 'public', 'web-apps', 'stickee', req.path);
    res.sendFile(filePath);
  } else {
    next();
  }
});

// Serve HTML for all routes (SPA)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  // Return 404 for /stickee but allow /web-apps/stickee
  if (req.path === '/stickee') {
    return res.status(404).send('Not Found');
  }
  // Handle PostHog toolbar authorization callback (any path)
  if (req.path.includes('/__posthog=')) {
    // Extract the base path and redirect to it with PostHog params in query string
    const basePath = req.path.split('/__posthog=')[0];
    const posthogParams = req.path.split('/__posthog=')[1];
    return res.redirect(`${req.protocol}://${req.get('host')}${basePath}?_posthog=${posthogParams}`);
  }
  
  // Serve appropriate HTML files
  if (req.path === '/') {
    // Track page view (with error handling)
    try {
      const clientIP = req.headers['x-forwarded-for'] || 
                      req.headers['x-real-ip'] || 
                      req.connection.remoteAddress || 
                      req.socket.remoteAddress ||
                      'unknown';
      
      posthog.capture({
        distinctId: clientIP,
        event: 'page_view',
        properties: {
          path: '/',
          user_agent: req.headers['user-agent'],
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('PostHog capture error:', error);
      // Continue serving the page even if PostHog fails
    }
    
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else if (req.path.startsWith('/web-apps/')) {
    // Serve web-app HTML files
    const webAppPath = req.path.replace('/web-apps/', '');
    const filePath = path.join(__dirname, 'public', 'web-apps', webAppPath);
    
    // Check if it's a directory, serve index.html if it exists
    if (webAppPath && !webAppPath.includes('.')) {
      const indexPath = path.join(filePath, 'index.html');
      if (require('fs').existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Web app not found');
      }
    } else if (require('fs').existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('Web app not found');
    }
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Visit http://localhost:${PORT} to see your portfolio`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await posthog.shutdown();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await posthog.shutdown();
  process.exit(0);
});
