import type { SortTypes } from "../../types/index.js";
export interface Props {
    filter?: object;
    select?: Record<string, string | number | boolean | object> | null;
    populate?: string[] | null;
    limit?: number;
    page?: number;
    sort?: SortTypes;
}
declare const findAll: ({ filter, select, populate, limit, page, sort }: Props) => Promise<(import("mongoose").Document<unknown, {}, {
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
})[]>;
export default findAll;
//# sourceMappingURL=findAll.d.ts.map