export interface Props {
    name: string;
    email: string;
    password: string;
}
declare const createOne: ({ name, email, password }: Props) => Promise<{
    name: string;
    status: string[];
    email: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: import("mongoose").Types.ObjectId;
    __v: number;
}>;
export default createOne;
//# sourceMappingURL=createOne.d.ts.map