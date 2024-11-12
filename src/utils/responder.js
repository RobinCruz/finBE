module.exports = {
    sendResponse: (response, statusCode, data) => {
      response.status(statusCode).json(data);
    }
  };