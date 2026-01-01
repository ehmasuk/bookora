import path from "path";
import pino from "pino";
import { pinoHttp } from "pino-http";
const __dirname = import.meta.dirname;
// logger directory base path
const base = path.resolve(__dirname, "../../logs");
const infoPath = path.join(base, "info/info.log");
const errorPath = path.join(base, "error/error.log");
// logger transports
const transports = pino.transport({
    targets: [
        // *INFO logs: handled with pino-http
        {
            target: "pino-roll",
            level: "info",
            options: {
                file: infoPath,
                frequency: "daily",
                mkdir: true,
                limit: { count: 15 },
                dateFormat: "dd-MM-yyyy",
            },
        },
        // *ERROR logs: handled in global error handler
        {
            target: "pino-roll",
            level: "error",
            options: {
                file: errorPath,
                frequency: "daily",
                mkdir: true,
                limit: { count: 15 },
                dateFormat: "dd-MM-yyyy",
            },
        },
    ],
});
// pino logger to log
const logger = pino({
    timestamp: pino.stdTimeFunctions.isoTime,
}, transports);
// config logger function
const configLogger = (app) => {
    app.use(pinoHttp({
        logger: logger,
        // * This function generates a request id and set in header to use as requestId
        genReqId: (req, res) => {
            const existingID = req.id ?? req.headers["x-request-id"];
            if (existingID)
                return existingID;
            const id = crypto.randomUUID();
            res.setHeader("X-Request-Id", id);
            return id;
        },
    }));
};
export { configLogger, logger };
//# sourceMappingURL=logger.js.map