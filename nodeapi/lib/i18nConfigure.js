'use strict';

const i18n = require('i18n');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const autoReload = env === 'development';
const updateFiles = env === 'development';
const syncFiles = env === 'development';

module.exports = function() {
  i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '../locales'),
    defaultLocale: 'en',
    autoReload: autoReload, // recarga locales si tienen cambios
    updateFiles: updateFiles, // crear ficheros de locale inexistentes
    syncFiles: syncFiles, // sincroniza nuevos literales en todos los locales
    queryParameter: 'lang'
  });

  i18n.setLocale('en');

  return i18n;

}