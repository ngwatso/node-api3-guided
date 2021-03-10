const Hubs = require('./hubs-model.js');

const checkId = async (req, res, next) => {
  const hub = await Hubs.findById(req.params.id)
  if (!hub) {
    res.status(404).json({
      message: `hub with id ${req.params.id} does not exist`
    })
  } else {
    
    next()
  }
}

module.exports = {
  checkId,
}
