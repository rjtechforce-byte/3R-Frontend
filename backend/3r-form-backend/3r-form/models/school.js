const mongoose = require('mongoose');


const schoolSchema = new mongoose.Schema({
  schoolImage: {
    type:String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  subDistrict: {
    type: String,
    required: true,
    enum: ['sardarshahar', 'ratangarh', 'sujangarh', 'taranagar', 'bidasar', 'churu', 'rajgarh']
  },
  password: {
    type: String,
    required: true,
  },
 schoolEmail: {
    type: String,
    unique: true,
    required: true,
  },
  schoolPhone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  inchargeName: {
    type: String,
    required: true,
  },
  inchargePhone: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('School', schoolSchema);