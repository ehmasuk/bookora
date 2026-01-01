import type { RequestHandler } from "express";
export type bookControllersType = {
    createBook: RequestHandler;
    deleteBook: RequestHandler;
    getAllBook: RequestHandler;
    getSingleBook: RequestHandler;
    updateBook: RequestHandler;
    getBooksOfaUser: RequestHandler;
};
declare const bookControllers: bookControllersType;
export default bookControllers;
//# sourceMappingURL=book.d.ts.map