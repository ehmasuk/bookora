import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    user: import("mongoose").Types.ObjectId;
    prompt: string;
    category?: string | null;
    genre?: string | null;
    tone?: string | null;
    targetAudience?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    user: import("mongoose").Types.ObjectId;
    prompt: string;
    category?: string | null;
    genre?: string | null;
    tone?: string | null;
    targetAudience?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
}> & {
    user: import("mongoose").Types.ObjectId;
    prompt: string;
    category?: string | null;
    genre?: string | null;
    tone?: string | null;
    targetAudience?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
}, {
    user: import("mongoose").Types.ObjectId;
    prompt: string;
    category?: string | null;
    genre?: string | null;
    tone?: string | null;
    targetAudience?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    user: import("mongoose").Types.ObjectId;
    prompt: string;
    category?: string | null;
    genre?: string | null;
    tone?: string | null;
    targetAudience?: string | null;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
}>> & import("mongoose").FlatRecord<{
    user: import("mongoose").Types.ObjectId;
    prompt: string;
    category?: string | null;
    genre?: string | null;
    tone?: string | null;
    targetAudience?: string | null;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=draftAiBook.d.ts.map