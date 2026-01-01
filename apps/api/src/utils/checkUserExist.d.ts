declare const checkUserExist: (email: string) => Promise<false | (import("mongoose").Document<unknown, {}, {
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
})>;
export default checkUserExist;
//# sourceMappingURL=checkUserExist.d.ts.map