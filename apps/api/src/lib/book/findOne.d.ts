export interface Props {
    filter: object;
    populate?: string[] | null;
}
declare const findOne: ({ filter, populate }: Props) => Promise<(import("mongoose").Document<unknown, {}, {
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
export default findOne;
//# sourceMappingURL=findOne.d.ts.map