declare const books: (count: number) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, {
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
export default books;
//# sourceMappingURL=books.d.ts.map