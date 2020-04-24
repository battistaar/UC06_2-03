const path = require('path');
const templateFolder = path.join(process.cwd(), 'src/templates');
const bookModel = require('../book/book.model');

module.exports.authorPage = (req, res, next) => {
    const author = req.params.name;
    
    bookModel.findByAuthor(author)
        .then(books => {
            res.render(path.join(templateFolder, 'main.ejs'), { books: books });
        })
        .catch(_ => {
            res.status(404);
            res.send('Not found');
        })
};