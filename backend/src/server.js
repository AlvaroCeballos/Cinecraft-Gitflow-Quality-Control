const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const shareRoutes = require('./routes/shareRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/share', shareRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor de CineCraft corriendo en el puerto ${PORT}`);
});