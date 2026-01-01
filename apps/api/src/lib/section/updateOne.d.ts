export interface Props {
    id: string;
    update: object;
}
declare const updateOne: ({ id, update }: Props) => Promise<(import("mongoose").Document<unknown, {}, {
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
}) | null>;
export default updateOne;
//# sourceMappingURL=updateOne.d.ts.map