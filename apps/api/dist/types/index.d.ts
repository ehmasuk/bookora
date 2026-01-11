import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
export type SortTypes = "ASC" | "DESC";
export interface CustomRequest extends Request {
    user?: any;
}
export interface ErrorWithStatusCode extends Error {
    statusCode?: number;
}
export interface DecodedTokenType extends JwtPayload {
    id: string;
}
export interface ExportBookResponse_SectionType {
    title: string;
    position: number;
    content: JSON;
}
export interface ExportBookResponse_ChapterType {
    title: string;
    position: number;
    sections: ExportBookResponse_SectionType[];
}
export interface ExportBookResponse_BookType {
    title: string;
    chapters: ExportBookResponse_ChapterType[];
}
export declare enum ExportBookFormatTypes {
    PDF = "pdf",
    DOCX = "docx"
}
//# sourceMappingURL=index.d.ts.map