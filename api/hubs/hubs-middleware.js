const checkId = (req, res, next) => {
  console.log('checkId working')
  next()
}

module.exports = {
  checkId,
}
