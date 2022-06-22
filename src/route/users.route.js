const express = require('express');
const {
  getProfile,
  updatePhoto,
  updateProfile
} = require('../controllers/users.controller');
const jwtAuth = require('../middleware/auth.jwt');
const UploadPhoto = require('../middleware/uploadPhoto.multer');

const router = express.Router();

router
  .get('/profile', jwtAuth, getProfile)
  .post('/profile/update', jwtAuth, updateProfile)
  .post('/profile/update-photo', jwtAuth, UploadPhoto, updatePhoto);

module.exports = router;
