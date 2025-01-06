const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// .env dosyasını yükleyelim
dotenv.config();

const app = express();

// Ortam değişkenlerini kullanarak MongoDB'ye bağlanalım
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB bağlantısı başarılı!'))
.catch((err) => console.log('MongoDB bağlantı hatası:', err));

// Middleware'ler
app.use(cors()); // CORS engellemesini kaldırır
app.use(express.json()); // JSON verileri almak için

// Rotalar
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});

mongoose.set('strictQuery', false);

