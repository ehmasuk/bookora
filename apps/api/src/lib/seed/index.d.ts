declare const _default: {
    books: (count: number) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, {
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
    }, Omit<{
        title: string;
        author: import("mongoose").Types.ObjectId | undefined;
        summary: string;
        status: string;
    }, "_id">>[]>;
    users: (count: number) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, {
        name: string;
        status: string[];
        email: string;
        password: string;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        toJSON: {
            virtuals: true;
        };
        toObject: {
            virtuals: true;
        };
    }> & {
        name: string;
        status: string[];
        email: string;
        password: string;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, Omit<{
        name: string;
        email: string;
        password: string;
        status: string;
    }, "_id">>[]>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map