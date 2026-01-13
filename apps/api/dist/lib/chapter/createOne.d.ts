export interface Props {
    title: string;
    bookId: string;
    summary?: string | undefined;
}
declare const createOne: ({ title, bookId, summary, }: Props) => Promise<object>;
export default createOne;
//# sourceMappingURL=createOne.d.ts.map