const ActivityModel = require('../models/activity.model');
const ImageActivityModel = require('../models/imageActivity.model');
const DestinationModel = require('../models/destination.model');
const { v4: uuidv4 } = require('uuid');

const { failed, success } = require('../helpers/response');

module.exports = {
  createActivity: async (req, res) => {
    const { name, description, price, note, suggestion, destination_id } =
      req.body;

    const destination = await DestinationModel.findOne({
      where: { destination_id }
    });

    if (!destination) {
      return failed(res, 404, 'Destination not found');
    }

    const activity = new ActivityModel({
      destination_id,
      name,
      description,
      price,
      note,
      suggestion,
      imageId: uuidv4()
    });

    activity
      .save()
      .then((data) => {
        return success(res, 201, {
          message: 'Successfuly create activity',
          data
        });
      })
      .catch((err) => {
        return failed(res, 500, err.message);
      });
  },

  UploadphotoActivity: async (req, res) => {
    const { id } = req.params;
    const { imageId } = req.body;

    const activity = await ActivityModel.findOne({
      where: { activity_id: id }
    });

    if (!activity) {
      return failed(res, 404, 'Activity not found');
    }

    const imageActivity = new ImageActivityModel({
      name: req.file['filename'],
      imageId
    });

    imageActivity
      .save()
      .then((data) => {
        return success(res, 201, {
          message: 'Successfuly create image activity',
          data
        });
      })

      .catch((err) => {
        return failed(res, 500, err.message);
      });
  },
  DetailActivity: (req, res) => {
    const { id } = req.params;

    ActivityModel.findOne({ where: { activity_id: id } })
      .then((activity) => {
        if (!activity) {
          return failed(res, 404, 'Activity not found');
        }

        ImageActivityModel.findAll({
          where: { imageId: activity.imageId },
          attributes: ['name']
        })
          .then((imageActivity) => {
            success(res, 200, {
              ...activity.dataValues,
              listImage: imageActivity
            });
          })
          .catch((err) => {
            return failed(res, 500, err.message);
          });
      })
      .catch((err) => {
        return failed(res, 500, err.message);
      });
  },
  PopularActivity: (req, res) => {
    const { destinationId } = req.params;

    ActivityModel.findAll({
      where: { is_popular: true, destination_id: destinationId }
    })
      .then(async (activity) => {
        if (!activity) {
          return failed(res, 404, 'Activity not found');
        }

        if (activity.length === 0) {
          return failed(res, 404, 'Activity not found');
        }

        const data = await Promise.all(
          activity.map(async (item) => {
            const image = await ImageActivityModel.findOne({
              where: { imageId: item.imageId }
            });

            return {
              ...item.dataValues,
              Image: image
            };
          })
        );

        success(res, 200, data);
      })
      .catch((err) => {
        return failed(res, 500, err.message);
      });
  },
  ListActivity: (req, res) => {
    const { page = 1 } = req.query;
    const { destinationId } = req.params;

    if (destinationId === 'all') {
      ActivityModel.findAll({
        offset: (page - 1) * 12,
        limit: 12
      })
        .then(async (activity) => {
          if (!activity) {
            return failed(res, 404, 'Activity not found');
          }

          if (activity.length === 0) {
            return failed(res, 404, 'Activity not found');
          }

          const data = await Promise.all(
            activity.map(async (item) => {
              const image = await ImageActivityModel.findOne({
                where: { imageId: item.imageId }
              });

              return {
                ...item.dataValues,
                Image: image
              };
            })
          );

          return success(res, 200, data);
        })
        .catch((err) => {
          return failed(res, 500, err.message);
        });
    } else {
      ActivityModel.findAll({
        where: { destination_id: destinationId },
        limit: 12,
        offset: (page - 1) * 12
      })
        .then(async (activity) => {
          const data = await Promise.all(
            activity.map(async (activity) => {
              const image = await ImageActivityModel.findOne({
                where: { imageId: activity.imageId },
                attributes: ['name']
              });
              return { ...activity.dataValues, image };
            })
          );

          success(res, 200, data);
        })
        .catch((err) => {
          return failed(res, 500, err.message);
        });
    }
  }
};
