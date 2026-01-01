import path from "path";
import swaggerUiExpress from "swagger-ui-express";
import { fileURLToPath } from "url";
import yamljs from "yamljs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docPath = path.join(__dirname, "../../swagger.yaml");
const swaggerDocs = yamljs.load(docPath);
const configSwagger = (app) => {
    app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));
};
export default configSwagger;
//# sourceMappingURL=swagger.js.map