import { SERVER_ERROR } from "../helpers/statusCode";

const errorHandler = (error, request, response, next) => {
  const { errors } = error;
  let { status, message, description } = error;
  if (!status) {
    status = SERVER_ERROR;
    message = "Oups ! Quelque chose ne fonctionne pas !";
    description = 
    "Le serveur SwimangoApi rencontre un problème technique. Veuillez réessayer plus tard.";
  }
  if (error.name === "ValidationError") {
    response.status(status).json({
      message,
      errors,
    });
  } else {
    response.status(status).json({
      message,
      description,
    });
  }
};

export default errorHandler;