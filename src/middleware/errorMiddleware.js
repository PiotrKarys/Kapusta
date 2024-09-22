const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[${statusCode}] ${message}`);

  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: message,
  });
};

module.exports = errorHandler;
