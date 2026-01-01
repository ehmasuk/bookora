import { Schema, model } from "mongoose";
const sectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    chapter: {
        type: Schema.Types.ObjectId,
        ref: "chapter",
        required: true,
    },
    content: {
        type: Schema.Types.Mixed,
        default: null,
    },
    position: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true, minimize: false },
    toObject: { virtuals: true, minimize: false },
});
export default model("section", sectionSchema);
//# sourceMappingURL=section.js.map