import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    title: string;
    chapter: import("mongoose").Types.ObjectId;
    position: number;
    content?: any;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    title: string;
    chapter: import("mongoose").Types.ObjectId;
    position: number;
    content?: any;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
    toJSON: {
        virtuals: true;
        minimize: false;
    };
    toObject: {
        virtuals: true;
        minimize: false;
    };
}> & {
    title: string;
    chapter: import("mongoose").Types.ObjectId;
    position: number;
    content?: any;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    toJSON: {
        virtuals: true;
        minimize: false;
    };
    toObject: {
        virtuals: true;
        minimize: false;
    };
}, {
    title: string;
    chapter: import("mongoose").Types.ObjectId;
    position: number;
    content?: any;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    title: string;
    chapter: import("mongoose").Types.ObjectId;
    position: number;
    content?: any;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
    toJSON: {
        virtuals: true;
        minimize: false;
    };
    toObject: {
        virtuals: true;
        minimize: false;
    };
}>> & import("mongoose").FlatRecord<{
    title: string;
    chapter: import("mongoose").Types.ObjectId;
    position: number;
    content?: any;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=section.d.ts.map