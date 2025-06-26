require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route imports
const articleRoutes = require('./routes/articleRoutes');
const mailArticleRoutes = require('./routes/mailArticleRoutes');
const fastFashionRoutes = require('./routes/fastFashionRoutes');
const luxuryFashionRoutes = require('./routes/luxuryFashionRoutes');
const sustainableFashionRoutes = require('./routes/sustainableFashionRoutes');
const sneakerWorldRoutes = require('./routes/sneakerWorldRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Base routes
app.use('/api/articles', articleRoutes);                         // Articles model
app.use('/api/mail-articles', mailArticleRoutes);               // MailArticles model

// Fashion Section Routes
app.use('/api/fast-fashion', fastFashionRoutes);                // FastFashion model
app.use('/api/luxury-fashion', luxuryFashionRoutes);            // LuxuryFashion model
app.use('/api/sustainable-fashion', sustainableFashionRoutes);  // SustainableFashion model
app.use('/api/sneaker-world', sneakerWorldRoutes);              // SneakerWorld model

// Root
app.get('/', (req, res) => {
  res.send('📰 LIT Newsletter API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
