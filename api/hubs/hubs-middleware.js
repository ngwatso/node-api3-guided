const Hubs = require('./hubs-model.js');

const checkId = async (req, res, next) => {
  const hub = await Hubs.findById(req.params.id)
  if (!hub) {
    
  }
}

module.exports = {
  checkId,
}
