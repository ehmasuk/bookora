declare const _default: {
    findAll: ({ filter, select, populate, limit, page, sort }: import("./findAll.js").Props) => Promise<(import("mongoose").Document<unknown, {}, {
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
    })[]>;
    findOne: ({ filter, populate }: import("./findOne.js").Props) => Promise<(import("mongoose").Document<unknown, {}, {
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
    }) | null>;
    createOne: ({ name, email, password }: import("./createOne.js").Props) => Promise<{
        name: string;
        status: string[];
        email: string;
        createdAt: NativeDate;
        updatedAt: NativeDate;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map