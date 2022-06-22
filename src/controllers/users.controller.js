const UserModel = require('../models/users.model');

const { success, failed } = require('../helpers/response');
const { deleteFile } = require('../helpers/PhotoHandler.fs');

module.exports = {
  getProfile: (req, res) => {
    const id = req.APP_DATA.tokenDecoded.id;
    UserModel.findOne({ where: { id } })
      .then((user) => {
        if (!user) {
          return failed(res, 404, 'User not found');
        }

        const {
          id,
          photo,
          full_name,
          email,
          phone,
          address,
          city,
          postal_code,
          is_verified
        } = user;

        return success(res, 200, {
          message: 'Successfuly get user profile',
          id,
          photo,
          full_name,
          email,
          phone,
          address,
          city,
          postal_code,
          is_verified
        });
      })
      .catch((err) => {
        return failed(res, 500, err.message);
      });
  },

  updateProfile: (req, res) => {
    const id = req.APP_DATA.tokenDecoded.id;
    const { phone, address, city, postal_code, email, full_name } = req.body;
    UserModel.update(
      {
        email,
        full_name,
        phone,
        address,
        city,
        postal_code,
        updated_at: new Date()
      },
      { where: { id } }
    )
      .then((user) => {
        if (!user) {
          return failed(res, 404, 'User not found');
        }

        return success(res, 200, {
          message: 'Successfuly update user profile'
        });
      })
      .catch((err) => {
        return failed(res, 500, err.message);
      });
  },
  updatePhoto: async (req, res) => {
    const id = req.APP_DATA.tokenDecoded.id;

    const user = await UserModel.findOne({ where: { id } });

    if (user.photo) {
      deleteFile(user.photo);
    }

    UserModel.update(
      {
        photo: req.file['filename'],
        updated_at: new Date()
      },
      { where: { id } }
    ).then((user) => {
      if (!user) {
        return failed(res, 404, 'User not found');
      }

      return success(res, 200, {
        message: 'Successfuly update user photo'
      });
    });
  }
};
