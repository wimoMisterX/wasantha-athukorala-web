var fs = require('fs');

module.exports = {
    home_content: JSON.parse(fs.readFileSync(__dirname + '/../../../content_files/' + 'home.json', 'utf8')),
    about_content: JSON.parse(fs.readFileSync(__dirname + '/../../../content_files/' + 'about.json', 'utf8')),
    services_content: JSON.parse(fs.readFileSync(__dirname + '/../../../content_files/' + 'services.json', 'utf8')),
};
