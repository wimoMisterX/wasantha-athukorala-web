# Wasantha Athukorala Website

This is my first Mithirl SPA. Please be kind ;)

## Directory Structure
```
src/
| |- app/
| |- assets/
| | |- js/
| | |- css/
| | |- images/
| | |- fonts/
| |- index.html
index.js
settings.json
package.json
```
* `src/app` - App realated javascript files with an entry file for Browserify to modularise the files.
* `src/assets` - Static files with each file in specific folder
* `src/index.html` - Single page html file
* `index.js` - Express server
* `settings.json` - Secret settings files used by `index.js`

## Setup
1. Clone repo
2. Install Node LST
3. Install npm packages from package.json by `npm install`
4. Start the server by `npm start`

## NPM Commands
* `npm run watch` - Live rebuilding javascript bundle
* `npm run build` - Build javascript bundle
* `npm start` - Starts the server at port 3001
