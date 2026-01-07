import { Schema, model } from "mongoose";

const draftAiBookSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    genre: {
      type: String,
    },
    tone: {
      type: String,
    },
    targetAudience: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

draftAiBookSchema.virtual("chapters", {
  ref: "chapter",
  localField: "_id",
  foreignField: "book",
  sort: { position: 1 },
});

export default model("draftAiBook", draftAiBookSchema);

