const DestinationModel = require('../models/destination.model');
const ActivityModel = require('../models/activity.model');
const ActivityImageModel = require('../models/ImageActivity.model');
const { success, failed } = require('../helpers/response');

module.exports = {
  ListDestination: (req, res) => {
    DestinationModel.findAll()
      .then(async (destination) => {
        if (!destination) {
          return failed(res, 404, 'Destination not found');
        }

        const data = await Promise.all(
          destination.map(async (destination) => {
            const { destination_id, name, photo, updated_at, created_at } =
              destination;
            const totalActivity = await ActivityModel.count({
              where: { destination_id }
            });
            return {
              destination_id,
              name,
              photo,
              totalActivity,
              updated_at,
              created_at
            };
          })
        );

        return success(res, 200, data);
      })
      .catch((err) => {
        return failed(res, 500, err.message);
      });
  },
  DestinationDetail: (req, res) => {
    const { id } = req.params;
    DestinationModel.findOne({ where: { id } })
      .then((destination) => {
        if (!destination) {
          return failed(res, 404, 'Destination not found');
        }

        success(res, 200, destination);
      })
      .catch((err) => {
        failed(res, 500, err.message);
      });
  },
  CreateDestination: (req, res) => {
    const { name, description, temperature, best_time_to_visit } = req.body;

    const destination = new DestinationModel({
      name,
      description,
      photo: req.file['filename'],
      temperature,
      best_time_to_visit
    });

    destination
      .save()

      .then((data) => {
        return success(res, 201, {
          message: 'Successfuly create destination',
          data
        });
      })
      .catch((err) => {
        return failed(res, 500, err.message);
      });
  },
  UpdateDestination: (req, res) => {
    const { name, description, temperature, best_time_to_visit } = req.body;
    const { id } = req.params;

    DestinationModel.findOne({ where: { id } })
      .then((destination) => {
        if (!destination) {
          return failed(res, 404, 'Destination not found');
        }

        destination
          .update({
            name,
            description,
            temperature,
            best_time_to_visit
          })
          .then((data) => {
            return success(res, 200, {
              message: 'Successfuly update destination',
              data
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
  DeleteDestination: (req, res) => {
    const { id } = req.params;

    DestinationModel.findOne({ where: { id } })
      .then((destination) => {
        if (!destination) {
          return failed(res, 404, 'Destination not found');
        }

        destination
          .destroy()
          .then((data) => {
            return success(res, 200, {
              message: 'Successfuly delete destination',
              data
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

  activityDestination: async (req, res) => {
    const { destinationId } = req.params;
    const { page = 1, limit = 12, search } = req.query;

    let activity = [];

    if (destinationId === 'all') {
      activity = await ActivityModel.findAll({
        where: search
          ? {
              name: {
                [Op.iLike]: `%${search}%`
              }
            }
          : {},
        order: [['activity_id', 'DESC']],
        offset: (page - 1) * limit,
        limit: limit * 1
      });
    } else {
      activity = await ActivityModel.findAll({
        where: {
          destination_id: destinationId
        },
        order: [['activity_id', 'DESC']],
        offset: (page - 1) * limit,
        limit: limit
      });
    }

    if (activity.length === 0) {
      return failed(res, 404, 'Activity not found');
    }

    const data = await Promise.all(
      activity.map(async (item) => {
        const image = await ActivityImageModel.findOne({
          where: {
            ImageId: item.dataValues.imageId
          }
        });

        if (image) {
          return {
            ...item.dataValues,
            image: image.dataValues.name
          };
        }

        return {
          ...item.dataValues
        };
      })
    );

    return success(res, 200, {
      message: 'Successfuly get activity',
      data
    });
  },
  destinationById: async (req, res) => {
    const { destinationId } = req.params;

    const destination = await DestinationModel.findOne({
      where: {
        destination_id: destinationId
      }
    });

    if (destination === null) {
      return failed(res, 404, 'Destination not found');
    }

    const activity = await ActivityModel.findAll({
      where: {
        destination_id: destinationId,
        is_active: true,
        is_popular: true
      }
    });

    if (activity === null) {
      return success(res, 200, {
        message: 'Successfuly get destination',
        data: {
          destination,
          activityPopular: []
        }
      });
    } else {
      const dataActivityPopular = await Promise.all(
        activity.map(async (item) => {
          const ImageId = await ActivityImageModel.findOne({
            where: {
              ImageId: item.imageId
            }
          });

          if (ImageId === null) {
            return {
              ...item.dataValues,
              Image: ''
            };
          } else {
            return {
              ...item.dataValues,
              Image: ImageId.name
            };
          }
        })
      );

      return success(res, 200, {
        message: 'Successfuly get destination',
        data: {
          destination,
          activityPopular: dataActivityPopular
        }
      });
    }
  }
};
