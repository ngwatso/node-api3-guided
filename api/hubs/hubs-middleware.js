const checkId = (req, res, next) => {
  console.log('working')
  next()
}

module.exports = {
  checkId,
}
