export const errorHandler = (error, req, res, next) => {
  let errorMessage = error.message;
  const errorType = error.name;
  let statusCode = 500;

  switch (errorType) {
    case "CastError":
      statusCode = 400;
      break;

    case "ValidationError":
      statusCode = 422;
      break;
    default:
      statusCode = 500;
  }
  //`${error.stack}`
  // const testMessage = new ErrorResponse("test error message", 415);
  console.log(`Error from middleware: ${error.stack}`);

  return res.status(statusCode).json({ error: `${error.message}` });
};
