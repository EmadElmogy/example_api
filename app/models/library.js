var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LibraryMangmentSchema   = new Schema({
    book_id: Number,
    category_name: String,
    book_price:Number
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('LibraryMangment', LibraryMangmentSchema);
