const statusMessages = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error',
  }
  
  exports.success = (req, res, message, status) => {
    let statusCode = status
    let statusMessage = message
  
    if (!statusCode) status = 200
  
    if (!message) statusMessage = statusMessages[status]
  
    res.status(statusCode).send({
      error: '',
      body: statusMessage,
    })
  }
  
  exports.error = (req, res, error, status, details) => {
    console.log('[ response error ] ' + details)
    res.status(status || 500).send({
      error: error,
      body: '',
    })
  }
  