const fs = require('fs');
const path = require('path');
const util = require('util');
const dataFile = path.join(process.cwd(), 'data/books.json');
const writeFile = util.promisify(fs.writeFile);

let allBooks = require(dataFile);

module.exports.list = () => {
    return Promise.resolve(allBooks);
}

module.exports.get = (id) => {
    const book = allBooks.find(b => b.id === id);
    if (!book) {
        return Promise.reject(new Error('Missing Document'));
    }
    return Promise.resolve(book);
}

module.exports.add = (bookData) => {
    allBooks.push(bookData);
    return writeFile(dataFile, JSON.stringify(allBooks))
        .then(_ => bookData);
}

module.exports.findByAuthor = (author) => {
    const books = allBooks.filter(b => b.authors.includes(author));
    return !books.length ? Promise.reject(new Error('Missing Document')) : Promise.resolve(books);
}
