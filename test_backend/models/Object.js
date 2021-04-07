const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  warranty_years: { type: Number, required: true },
  available: {type : Boolean, require: true},
});

module.exports = mongoose.model('Object', objectSchema);