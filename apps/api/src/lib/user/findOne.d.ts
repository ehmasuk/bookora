export interface Props {
    filter: object;
    populate?: string[] | null;
}
declare const findOne: ({ filter, populate }: Props) => Promise<(import("mongoose").Document<unknown, {}, {
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
export default findOne;
//# sourceMappingURL=findOne.d.ts.map