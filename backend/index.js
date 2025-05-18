// backend/index.js
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projects')


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/projects', projectRoutes)


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Mount auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// backend/index.js
// … existing requires & app.use('/api/auth', authRoutes)

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// … health check & listen


// Health check
app.get('/', (req, res) => res.send('✅ API is up and running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
