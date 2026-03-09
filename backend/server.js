const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'https://luxury-pasca-537006.netlify.app',  // Your Netlify frontend
    'https://astounding-crepe-1e6349.netlify.app',
    'https://fraudguard-ai.netlify.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true
};

app.use(cors(corsOptions));

// Body parsing middleware with large file support
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is CSV
    if (file.mimetype === 'text/csv' ||
        file.mimetype === 'application/vnd.ms-excel' ||
        file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  }
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'FraudGuard AI Backend - Express Server' });
});

// Upload transaction endpoint
app.post('/upload/transaction', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please upload a CSV file'
      });
    }

    // Here you would process the CSV file
    // For now, just return success with file info
    const fileInfo = {
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploaded: true
    };

    // Mock fraud analysis response (replace with actual processing)
    const mockResponse = {
      stats: {
        total_rows: 100,
        columns: ['transaction_id', 'amount', 'customer_id', 'timestamp']
      },
      detection: {
        total_transactions: 100,
        fraud_detected_count: 5,
        all_records: [] // Would contain processed records
      }
    };

    console.log('File uploaded successfully:', fileInfo);

    res.json({
      message: 'File processed successfully',
      file: fileInfo,
      ...mockResponse
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Processing failed',
      message: error.message
    });
  }
});

// Transactions endpoint
app.get('/transactions', (req, res) => {
  // Mock data - replace with actual database queries
  res.json({
    transactions: [],
    message: 'Transactions endpoint - implement database connection'
  });
});

// Fraud summary endpoint
app.get('/fraud-summary', (req, res) => {
  // Mock data - replace with actual fraud analysis
  res.json({
    total_transactions: 0,
    fraud_cases: 0,
    message: 'Fraud summary endpoint - implement analysis logic'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'File size must be less than 50MB'
      });
    }
  }

  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 FraudGuard AI Express server running on port ${PORT}`);
  console.log(`📍 Server accessible at: http://0.0.0.0:${PORT}`);
  console.log(`🌐 CORS enabled for: ${corsOptions.origin.join(', ')}`);
  console.log(`📁 File upload endpoint: POST /upload/transaction`);
  console.log(`❤️  Health check: GET /health`);
});

module.exports = app;