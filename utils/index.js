let translit = require('transliteration');

module.exports = {
    getTranslit: function(str) {
        return translit.slugify(str);
    }
};

