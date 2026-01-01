import { Schema, model } from "mongoose";
const userStatus = ["blocked", "verified", "unverified"];
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: [String],
        enum: userStatus,
        default: ["unverified"],
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
userSchema.virtual("books", {
    ref: "book",
    localField: "_id",
    foreignField: "author",
});
export default model("user", userSchema);
//# sourceMappingURL=user.js.map