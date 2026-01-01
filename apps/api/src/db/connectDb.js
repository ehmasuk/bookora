import mongoose from "mongoose";
import env from "../config/env.js";
const connectDb = async () => {
    const connection = await mongoose.connect(env.MONGODB_URL, { dbName: env.DB_NAME });
    return connection;
};
export default connectDb;
//# sourceMappingURL=connectDb.js.map