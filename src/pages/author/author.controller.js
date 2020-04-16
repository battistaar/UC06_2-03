const path = require('path');
const dataFile = path.join(process.cwd(), 'data/books.json');
const templateFolder = path.join(process.cwd(), 'src/templates');
let allBooks = require(dataFile);

module.exports.authorPage = (req, res, next) => {
    const author = req.params.name;
    const books = allBooks.filter(b => b.authors.includes(author));
    if (!books.length) {
        res.status(404);
        next(new Error('Not Found'))
        return;
    }
    res.render(path.join(templateFolder, 'main.ejs'), { books: books });
};