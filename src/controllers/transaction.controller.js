const { success, failed } = require('../helpers/response');
const ActivityModel = require('../models/activity.model');
const Transaction = require('../models/transaction.model');

module.exports = {
  placeOrder: async (req, res) => {
    const user_id = req.APP_DATA.tokenDecoded.id;

    const {
      activity_id,
      full_name,
      email,
      phone,
      quantity,
      total_price,
      status,
      date,
      insurance
    } = req.body;

    const transaction = new Transaction({
      user_id,
      activity_id,
      full_name,
      email,
      phone,
      quantity,
      total_price,
      status,
      date,
      insurance
    });

    const PlaceOrder = await transaction.save();

    if (!PlaceOrder) {
      return failed(res, 500, 'Failed to place order');
    }

    return success(res, 200, {
      message: 'Successfuly place order',
      data: PlaceOrder
    });
  },
  getOrder: async (req, res) => {
    const user_id = req.APP_DATA.tokenDecoded.id;
    const { id } = req.params;

    const DetailOrder = await Transaction.findOne({
      where: { transaction_id: id, user_id }
    });

    if (!DetailOrder) {
      return failed(res, 404, 'Order not found');
    }

    const Activity = await ActivityModel.findOne({
      where: { activity_id: DetailOrder.activity_id }
    });

    if (!Activity) {
      return failed(res, 404, 'Activity not found');
    }

    return success(res, 200, {
      message: 'Successfuly get order',
      data: {
        ...DetailOrder.dataValues,
        activity: Activity.dataValues
      }
    });
  },
  getAllOrder: async (req, res) => {
    const user_id = req.APP_DATA.tokenDecoded.id;

    const AllOrder = await Transaction.findAll({
      where: { user_id }
    });

    if (!AllOrder) {
      return failed(res, 404, 'Order not found');
    }

    const data = await Promise.all(
      AllOrder?.map(async (item) => {
        const activity = await ActivityModel.findOne({
          where: { activity_id: item.activity_id }
        });

        return {
          ...item.dataValues,
          activity: activity.dataValues
        };
      })
    );

    return success(res, 200, {
      message: 'Successfuly get all order',
      data
    });
  }
};
