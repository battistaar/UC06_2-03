const fs = require('fs');
const path = require('path');
const dataFile = path.join(process.cwd(), 'data/books.json');
const templateFolder = path.join(process.cwd(), 'src/templates');
let allBooks = require(dataFile);

module.exports.getBook = (req, res, next) => {
    const id = req.params.id;
    const book = allBooks.find(b => b.id === id);
    if (!book) {
        res.status(404);
        res.send('Not found');
        return;
    }

    res.render(path.join(templateFolder, 'detail.ejs'), { book: book });
}

module.exports.listBooks = (req, res) => {
    res.render(path.join(templateFolder, 'main.ejs'), { books: allBooks });
}

module.exports.addPage = (req, res) => {
    res.render(path.join(templateFolder, 'addbook.ejs'));
}

module.exports.addBook = (req, res, next) => {
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
    fs.writeFile(dataFile, JSON.stringify(allBooks), (err) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect('/books');
    });
}