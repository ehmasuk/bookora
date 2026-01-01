export interface BookType {
  id: string;
  title: string;
  summary: string;
  author: string;
  status: string[];
  cover: string | null;
  chapters?: ChapterType[];
}

export interface ChapterType {
  id: string;
  title: string;
  book: BookType;
  summary: string;
  position: number;
  sections?: SectionType[];
}

export interface SectionType {
  id: string;
  title: string;
  position: number;
  content: object;
  chapter: string;
}
