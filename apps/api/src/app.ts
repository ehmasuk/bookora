import express, { type Application } from "express";
import { configLogger } from "./config/logger.js";
import configSwagger from "./config/swagger.js";
import { catchGlobalErrors, notFound } from "./middlewares/globalErrorHandlers.js";
import middlewares from "./middlewares/index.js";
import routes from "./routes/index.js";

const app: Application = express();

// load all middlewares
middlewares(app);

// configure swagger
configSwagger(app);

//configure logger
configLogger(app);

// load all routes
routes(app);

// catch not found routes and throw error
app.use(notFound);

// identify and throw global errors
app.use(catchGlobalErrors);

export default app;
