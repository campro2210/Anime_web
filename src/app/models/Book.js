const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//slug
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Book = new Schema(
  {
    name: { type: String, required: true },
    type: String,
    author: String,
    linkImg: String,
    linkBook: String,
    description: String,
    slug: { type: String, slug: "name",unique: true }
  },
  {
      timestamps: true,
  },

);

// Add plugins
mongoose.plugin(slug);
Book.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Book',Book);