import { Schema, model } from "mongoose";
const chapterSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "book",
        required: true,
    },
    summary: {
        type: String,
    },
    position: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
chapterSchema.virtual("sections", {
    ref: "section",
    localField: "_id",
    foreignField: "chapter",
    sort: { position: 1 },
});
export default model("chapter", chapterSchema);
//# sourceMappingURL=chapter.js.map