import type { Application } from "express";
import pino from "pino";
declare const logger: pino.Logger<never, boolean>;
declare const configLogger: (app: Application) => void;
export { configLogger, logger };
//# sourceMappingURL=logger.d.ts.map