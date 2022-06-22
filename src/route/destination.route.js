const express = require('express');
const router = express.Router();

const {
  destinationById,
  activityDestination,
  ListDestination
} = require('../controllers/destination.controller');
const isAdmin = require('../middleware/isAdmin.jwt');
const UploadPhoto = require('../middleware/uploadPhoto.multer');

router
  .get('/destination/:destinationId', destinationById)
  .get('/destination/:destinationId/activity', activityDestination)
  .get('/destination', ListDestination);
module.exports = router;
