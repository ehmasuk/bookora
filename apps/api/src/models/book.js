import { Schema, model } from "mongoose";
const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    cover: {
        type: String,
    },
    summary: {
        type: String,
    },
    status: {
        type: String,
        enum: ["public", "private"],
        default: "private",
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
bookSchema.virtual("chapters", {
    ref: "chapter",
    localField: "_id",
    foreignField: "book",
    sort: { position: 1 },
});
export default model("book", bookSchema);
//# sourceMappingURL=book.js.map