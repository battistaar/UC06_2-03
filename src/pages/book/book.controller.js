const path = require('path');
const templateFolder = path.join(process.cwd(), 'src/templates');
const bookModel = require('./book.model');

module.exports.getBook = (req, res, next) => {
    const id = req.params.id;
    bookModel.get(id)
        .then(book => {
            res.render(path.join(templateFolder, 'detail.ejs'), { book: book });
        })
        .catch(next);
}

module.exports.listBooks = (req, res) => {
    bookModel.list()
        .then(books => {
            res.render(path.join(templateFolder, 'main.ejs'), { books: books });
        });
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
    bookModel.add(newBook)
        .then(_ => {
            res.redirect('/books');
        })
        .catch(next);
}