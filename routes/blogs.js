const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');
const router = express.Router();

// Blog yazısı oluşturma
router.post('/', async (req, res) => {
    const { title, content, author } = req.body;

    const user = await User.findById(author);
    if (!user) return res.status(400).send('Geçersiz kullanıcı.');

    const newBlog = new Blog({
        title,
        content,
        author
    });

    try {
        await newBlog.save();
        res.status(201).send('Blog yazısı başarıyla oluşturuldu!');
    } catch (err) {
        res.status(500).send('Blog yazısı oluşturulamadı.');
    }
});

// Blog yazılarını listeleme
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).send('Blog yazıları alınamadı.');
    }
});

module.exports = router;
