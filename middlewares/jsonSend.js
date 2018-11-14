/**
 * Middleware tbat adds a method to send response in json.
 * @module middleware/jsonSendMw
 */

const jsonSendMw = (req, res, next) => {
  res.json = (response) => {
    res.setHeader('Content-Type', 'application/json')
    const jsonResponse = JSON.stringify(response)
    res.end(jsonResponse)
  }

  next()
}

module.exports = jsonSendMw
