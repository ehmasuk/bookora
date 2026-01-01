import authRoutes from "./auth.js";
import bookRoutes from "./book.js";
import chapterRoutes from "./chapter.js";
import healthRoute from "./health.js";
import sectionRoutes from "./section.js";
import seedRoutes from "./seed.js";
import userRoutes from "./user.js";
const routes = (app) => {
    app.use("/api/health", healthRoute);
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/book", bookRoutes);
    app.use("/api/seed", seedRoutes);
    app.use("/api/chapter", chapterRoutes);
    app.use("/api/section", sectionRoutes);
};
export default routes;
//# sourceMappingURL=index.js.map