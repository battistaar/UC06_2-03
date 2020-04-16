const path = require('path');
const templateFolder = path.join(process.cwd(), 'src/templates');

module.exports.internalError = (err, req, res, next) => {
    console.error(err);
    res.render(path.join(templateFolder, 'error.ejs'));
}