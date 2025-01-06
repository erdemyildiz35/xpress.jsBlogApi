const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// Kullanıcı kayıt işlemi
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // E-posta ve kullanıcı adı zaten varsa hata döner
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Kullanıcı zaten var.');

    const hashedPassword = await bcrypt.hash(password, 10); // Şifreyi hash'leyelim

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).send('Kullanıcı başarıyla kaydedildi!');
    } catch (err) {
        res.status(500).send('Kullanıcı kaydedilemedi.');
    }
});

module.exports = router;
