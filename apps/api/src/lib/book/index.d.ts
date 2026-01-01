declare const _default: {
    createOne: ({ title, authorId }: import("./createOne.js").Props) => Promise<object>;
    findAll: ({ filter, select, populate, limit, page, sort }: import("./findAll.js").Props) => Promise<(import("mongoose").Document<unknown, {}, {
        title: string;
        author: import("mongoose").Types.ObjectId;
        status: "public" | "private";
        cover?: string | null;
        summary?: string | null;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        toJSON: {
            virtuals: true;
        };
        toObject: {
            virtuals: true;
        };
    }> & {
        title: string;
        author: import("mongoose").Types.ObjectId;
        status: "public" | "private";
        cover?: string | null;
        summary?: string | null;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne: ({ filter, populate }: import("./findOne.js").Props) => Promise<(import("mongoose").Document<unknown, {}, {
        title: string;
        author: import("mongoose").Types.ObjectId;
        status: "public" | "private";
        cover?: string | null;
        summary?: string | null;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        toJSON: {
            virtuals: true;
        };
        toObject: {
            virtuals: true;
        };
    }> & {
        title: string;
        author: import("mongoose").Types.ObjectId;
        status: "public" | "private";
        cover?: string | null;
        summary?: string | null;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteOne: (id: string) => Promise<void>;
    updateOne: ({ id, update }: import("./updateOne.js").Props) => Promise<(import("mongoose").Document<unknown, {}, {
        title: string;
        author: import("mongoose").Types.ObjectId;
        status: "public" | "private";
        cover?: string | null;
        summary?: string | null;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        toJSON: {
            virtuals: true;
        };
        toObject: {
            virtuals: true;
        };
    }> & {
        title: string;
        author: import("mongoose").Types.ObjectId;
        status: "public" | "private";
        cover?: string | null;
        summary?: string | null;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map