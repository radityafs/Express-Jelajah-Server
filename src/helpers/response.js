module.exports = {
  success: (res, code, data) =>
    res.status(code).send({
      status: 'success',
      data
    }),
  failed: (res, code, message) =>
    res.status(code).send({
      status: 'failed',
      message: message || 'Something went wrong'
    }),
  error: (res, error) =>
    res.status(500).json({
      status: 'error',
      message: error.message
    })
};
