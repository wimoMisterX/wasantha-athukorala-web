const fs = require('fs');

export const home_content = JSON.parse(fs.readFileSync(__dirname + '/../../../content_files/' + 'home.json', 'utf8'));
export const about_content = JSON.parse(fs.readFileSync(__dirname + '/../../../content_files/' + 'about.json', 'utf8'));
export const services_content = JSON.parse(fs.readFileSync(__dirname + '/../../../content_files/' + 'services.json', 'utf8'));
