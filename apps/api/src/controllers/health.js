const checkHealth = async (_req, res, next) => {
    try {
        res.status(200).json({
            code: 200,
            message: "success",
        });
    }
    catch (error) {
        next(error);
    }
};
export default checkHealth;
//# sourceMappingURL=health.js.map