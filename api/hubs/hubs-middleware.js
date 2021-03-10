const Hubs = require('./hubs-model.js');

const checkId = async (req, res, next) => {
  const hub = await Hubs.findById(req.params.id)
  if (!hub) {
    res.status(404).json({
      message: `hub with id ${req.params.id} does not exist`
    })
  } else {
    req.hub = hub
    next()
  }
}

module.exports = {
  checkId,
}
