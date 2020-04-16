const path = require('path');
const templateFolder = path.join(process.cwd(), 'src/templates');

module.exports.notFoundPage = (req, res) => {
    res.render(path.join(templateFolder, 'not-found.ejs'));
}

module.exports.notFoundError = (err, req, res, next) => {
    if (err.message === 'Not Found') {
        res.render(path.join(templateFolder, 'not-found.ejs'));
    } else {
        next(err);
    }
}