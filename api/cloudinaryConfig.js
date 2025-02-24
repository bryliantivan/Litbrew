const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'litbrew',
  api_key: '538786723474765',
  api_secret: '_mD_4Kg-jtD6qKvKt6n3IP6bthU',
});

module.exports = cloudinary;
