const express = require('express');
const router = express.Router();
const {
  createActivity,
  UploadphotoActivity,
  DetailActivity,
  PopularActivity,
  ListActivity
} = require('../controllers/activity.controller');
const UploadPhoto = require('../middleware/uploadPhoto.multer');

router
  .post('/activity', createActivity)
  .get('/activity/:id', DetailActivity)
  .post('/activity/photo/:id', UploadPhoto, UploadphotoActivity)
  .get('/activity/popular/:destinationId', PopularActivity)
  .get('/activity/destination/:destinationId', ListActivity);

module.exports = router;
