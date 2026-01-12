require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { PostHog } = require('posthog-node');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const PORT = 1234;

// Debug environment variables
console.log('Environment variables loaded:');
console.log('POSTHOG_API_KEY:', process.env.POSTHOG_API_KEY ? 'Set' : 'Not set');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Not set');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not set');

// PostHog client
const posthog = new PostHog(
  'phc_dOBViKPhL2wwSDvkWprVr9vmD5L5303U10sVxcqda3T',
  { host: 'https://us.i.posthog.com' }
);

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);


app.use(cors());
app.use(express.json());

// Subdomain handling for stickee.simicodes.xyz
app.use((req, res, next) => {
  const host = req.hostname;
  if (host === 'stickee.simicodes.xyz') {
    // Handle PostHog toolbar authorization callback first
    if (req.path.includes('/__posthog=')) {
      const posthogParams = req.path.split('/__posthog=')[1];
      // Redirect to hash format
      return res.redirect(`${req.protocol}://${req.get('host')}/#__posthog=${posthogParams}`);
    }
    
    // Handle static assets for the subdomain
    if (req.path.startsWith('/assets/')) {
      const assetPath = path.join(__dirname, 'public', 'web-apps', 'stickee', req.path);
      return res.sendFile(assetPath);
    }
    if (req.path === '/stickee-mobile.css') {
      return res.sendFile(path.join(__dirname, 'public', 'web-apps', 'stickee', 'stickee-mobile.css'));
    }
    if (req.path === '/kitten-nobg.png') {
      return res.sendFile(path.join(__dirname, 'public', 'kitten-nobg.png'));
    }
    return res.sendFile(path.join(__dirname, 'public', 'web-apps', 'stickee', 'index.html'));
  }
  next();
});

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

// Issues form API
app.post('/api/issues', async (req, res) => {
  console.log('Issue form submission received:', req.body);
  
  const { type, title, description, email } = req.body;
  
  if (!type || !title || !description) {
    console.log('Validation failed - missing fields');
    return res.status(400).json({ error: 'Type, title, and description are required' });
  }
  
  try {
    console.log('Attempting to insert issue into Supabase...');
    const { data, error } = await supabase
      .from('issues')
      .insert([
        {
          title: title.trim(),
          description: `${description.trim()}\n\nSubmitted by: ${email || 'Anonymous'}`,
          status: 'open',
          type: type.toLowerCase(),
          user_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to save issue' });
    }
    
    console.log('Issue insert successful:', data);
    
    // Track issue submission in PostHog
    try {
      posthog.capture({
        distinctId: email || 'anonymous',
        event: 'issue_submitted',
        properties: {
          type: type,
          title: title,
          email: email,
          timestamp: new Date().toISOString()
        }
      });
    } catch (posthogError) {
      console.error('PostHog capture error:', posthogError);
    }
    
    console.log('Issue submission successful');
    res.json({ success: true, message: 'Issue submitted successfully' });
  } catch (error) {
    console.error('Issue submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact form API
app.post('/api/contact', async (req, res) => {
  console.log('Contact form submission received:', req.body);
  
  const { name, email, message, location } = req.body;
  
  if (!name || !email || !message) {
    console.log('Validation failed - missing fields');
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  
  try {
    console.log('Attempting to insert into Supabase...');
    const { data, error } = await supabase
      .from('issues')
      .insert([
        {
          title: `Contact Form: ${name.trim()}`,
          description: `Email: ${email.trim().toLowerCase()}\n\nMessage: ${message.trim()}\n\nLocation: ${location || 'Unknown'}`,
          status: 'open',
          type: 'bug',
          user_id: '00000000-0000-0000-0000-000000000001'
        }
      ]);
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to save submission' });
    }
    
    console.log('Supabase insert successful:', data);
    
    // Track submission in PostHog
    try {
      posthog.capture({
        distinctId: email,
        event: 'contact_form_submitted',
        properties: {
          name: name,
          email: email,
          location: location,
          timestamp: new Date().toISOString()
        }
      });
    } catch (posthogError) {
      console.error('PostHog capture error:', posthogError);
    }
    
    console.log('Contact form submission successful');
    res.json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static assets for web apps

// Web app routes
app.get('/stickee', (req, res) => {
  res.redirect(301, 'https://stickee.simicodes.xyz');
});

// Stickee info page
app.get('/stickee/info', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stickee-info', 'index.html'));
});

// Serve favicon for stickee info page
app.get('/stickee/info/favicon.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stickee-info', 'favicon.png'));
});

// Serve static assets for stickee info page
app.use('/stickee/info/assets', express.static(path.join(__dirname, 'public', 'stickee-info', 'assets')));

// Test email link
app.get('/test-email', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-email.html'));
});

// Serve mobile CSS for stickee
app.get('/stickee-mobile.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stickee-mobile.css'));
});


// Serve HTML for all routes (SPA)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  // Return 404 for /web-apps/stickee but allow /stickee
  if (req.path === '/web-apps/stickee') {
    return res.status(404).send('Not Found');
  }
  // Handle PostHog toolbar authorization callback (any path)
  if (req.path.includes('/__posthog=')) {
    // Extract the base path and PostHog params
    const basePath = req.path.split('/__posthog=')[0];
    const posthogParams = req.path.split('/__posthog=')[1];
    // Redirect to hash format instead of query param
    return res.redirect(`${req.protocol}://${req.get('host')}${basePath}#__posthog=${posthogParams}`);
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
  } else if (req.path === '/stickee') {
    // Serve stickee app directly
    res.sendFile(path.join(__dirname, 'public', 'web-apps', 'stickee', 'index.html'));
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
