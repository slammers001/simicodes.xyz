require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const PORT = 3000;

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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
  const { email, github_username, message } = req.body;
  
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
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to save submission' });
    }
    
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
  if (req.path.startsWith('/api') || req.path.startsWith('/web-apps')) {
    return next();
  }
  // Don't serve index.html for direct file requests
  if (req.path.includes('.')) {
    return res.status(404).send('Not Found');
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Visit http://localhost:${PORT} to see your portfolio`);
});
