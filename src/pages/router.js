const express = require('express');
const router = express.Router();
const bookRouter = require('./book/book.router');
const authorRouter = require('./author/author.router');

router.use('/books', bookRouter);
router.use('/authors', authorRouter);
router.get('/', (req, res) => {
    res.redirect('/books');
});

module.exports = router;