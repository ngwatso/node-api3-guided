const Hubs = require('./hubs-model.js');

const checkId = async (req, res, next) => {
  try {
    const hub = await Hubs.findById(req.params.id)
    if (!hub) {
      res.status(404).json({
        message: `hub with id ${req.params.id} does not exist`
      })
    } else {
      req.hub = hub
      next()
    }
  } catch (err) {
    next(err)
  }
}

const validateHub = (req, res, next) => {
  if (!req.body.name || !req.body.name.trim()) {
    res.status(422).json({
      message: 'name is required',
    })
  } else {
    next()
  }
}

module.exports = {
  checkId,
  validateHub,
}
