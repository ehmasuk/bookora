export interface Props {
    filter: object;
    populate?: string[] | null;
}
declare const findOne: ({ filter, populate }: Props) => Promise<(import("mongoose").Document<unknown, {}, {
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
export default findOne;
//# sourceMappingURL=findOne.d.ts.map