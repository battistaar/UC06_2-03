const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
let allBooks = require('./data/books.json');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.post('/books', (req, res, next) => {
    const newBook = {
        id: '' + allBooks.length,
        title: req.body.title,
        authors: [req.body.author],
        description: req.body.description,
        imageLinks: {
            thumbnail: req.body.thumbnail
        }
    }
    allBooks.push(newBook);
    fs.writeFile('./data/books.json', JSON.stringify(allBooks), (err) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect('/');
    });
});

app.get('/books/add', (req, res) => {
    res.render(path.join(__dirname, 'templates', 'addbook.ejs'));
});

app.get('/authors/:name', (req, res) => {
    const author = req.params.name;
    const books = allBooks.filter(b => b.authors.includes(author));
    if (!books.length) {
        res.status(404);
        return;
    }
    res.render(path.join(__dirname, 'templates', 'main.ejs'), { books: books });
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const book = allBooks.find(b => b.id === id);
    if (!book) {
        res.status(404);
        return;
    }

    res.render(path.join(__dirname, 'templates', 'detail.ejs'), { book: book });
});

app.get('/books', (req, res) => {
    res.render(path.join(__dirname, 'templates', 'main.ejs'), { books: allBooks });
});

app.get('/', (req, res) => {
    res.redirect('/books');
})

app.listen(3000, () => console.log('app listening on port: 3000'));