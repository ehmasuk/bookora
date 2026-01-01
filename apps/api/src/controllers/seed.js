import seedServices from "../lib/seed/index.js";
import successResponse from "../utils/successResponse.js";
const seedUsers = async (req, res, next) => {
    try {
        const number = req.params.number;
        if (!number) {
            throw new Error("Number is required");
        }
        const count = parseInt(number);
        const seededUsers = await seedServices.users(count);
        return successResponse({ res, message: "Seeded successfully", data: seededUsers });
    }
    catch (error) {
        next(error);
    }
};
const seedBooks = async (req, res, next) => {
    try {
        const number = req.params.number;
        if (!number) {
            throw new Error("Number is required");
        }
        const count = parseInt(number);
        const seededBooks = await seedServices.books(count);
        return successResponse({ res, message: "Seeded successfully", data: seededBooks });
    }
    catch (error) {
        next(error);
    }
};
const seedControllers = {
    seedBooks,
    seedUsers,
};
export default seedControllers;
//# sourceMappingURL=seed.js.map