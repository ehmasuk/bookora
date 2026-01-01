export interface Props {
    id: string;
    update: object;
}
declare const updateOne: ({ id, update }: Props) => Promise<(import("mongoose").Document<unknown, {}, {
    title: string;
    book: import("mongoose").Types.ObjectId;
    position: number;
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
    book: import("mongoose").Types.ObjectId;
    position: number;
    summary?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}) | null>;
export default updateOne;
//# sourceMappingURL=updateOne.d.ts.map