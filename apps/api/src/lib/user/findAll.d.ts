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
export default findAll;
//# sourceMappingURL=findAll.d.ts.map