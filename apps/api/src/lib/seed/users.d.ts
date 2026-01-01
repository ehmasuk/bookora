declare const users: (count: number) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, {
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
export default users;
//# sourceMappingURL=users.d.ts.map