/**
 * Global Error Handling Middleware
 * 1. this middleare will called if the next(error) is passed
 * 2. this middleware will called if any mongoose validation error occure since express asyn error hadler is used
 * */
export const errorHandler = (error, req, res, next) => {
  const errorType = error.name;
  let statusCode = error.statusCode ? error.statusCode : 500;

  switch (errorType) {
    case "CastError":
      statusCode = 400;
      break;

    case "ValidationError":
      statusCode = 422;
      break;
    default:
      statusCode = statusCode;
  }
  //`${error.stack}`
  // const testMessage = new ErrorResponse("test error message", 415);
  console.log(`Error from middleware: ${error.stack}`);

  return res.status(statusCode).json({ error: `${error.message}` });
};
