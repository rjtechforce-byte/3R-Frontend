const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  title: {
   type: String,
   required: true
  },
  thumbnail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  condition:{
    type: String,
    required: true,
    enum: ['good', 'avarage', 'nice']
  },
  donorName: {
    type: String,
    required: true,
  },
  donorClass: {
   type: String,
    required: true,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '12th pass', "Don't Study in School"]
  },
  availability: {
   type: Number,
   default: 1
  },
  helpedStudents: {
    name: {
      type: String,
      default: null
    },
    class: {
      type: String,
      enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '12th pass', "Don't Study in School"]
    }
  },
  images: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true,
  }
  },  {
    timestamps: true
  });


  productSchema.index({
    title: "text",
    decription: "text",
    category: "text"
  });

module.exports = mongoose.model('Product', productSchema);