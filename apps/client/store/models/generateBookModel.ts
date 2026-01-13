import { Action, action } from "easy-peasy";

export interface GeneratedChapter {
  title: string;
  summary: string;
  position: number;
}

export interface GeneratedSection {
  title: string;
  position: number;
}

export interface BookFormData {
  prompt: string;
  category: string;
  genre: string;
  targetAudience: string;
  tone: string;
}

export interface GenerateBookModelType {
  formData: BookFormData | null;
  chapters: GeneratedChapter[];
  sections: GeneratedSection[][]; // Array of arrays, one per chapter
  setFormData: Action<GenerateBookModelType, BookFormData>;
  setChapters: Action<GenerateBookModelType, GeneratedChapter[]>;
  setSections: Action<GenerateBookModelType, GeneratedSection[][]>;
  updateChapter: Action<
    GenerateBookModelType,
    { index: number; chapter: Partial<GeneratedChapter> }
  >;
  updateSection: Action<
    GenerateBookModelType,
    {
      chapterIndex: number;
      sectionIndex: number;
      section: Partial<GeneratedSection>;
    }
  >;
  reset: Action<GenerateBookModelType, void>;
}

export const generateBookModel: GenerateBookModelType = {
  // states
  formData: null,
  chapters: [],
  sections: [],

  // actions
  setFormData: action((state, payload) => {
    state.formData = payload;
  }),

  setChapters: action((state, payload) => {
    state.chapters = payload;
  }),

  setSections: action((state, payload) => {
    state.sections = payload;
  }),

  updateChapter: action((state, { index, chapter }) => {
    const existing = state.chapters[index];
    if (existing) {
      state.chapters[index] = {
        title: chapter.title ?? existing.title,
        summary: chapter.summary ?? existing.summary,
        position: chapter.position ?? existing.position,
      };
    }
  }),

  updateSection: action((state, { chapterIndex, sectionIndex, section }) => {
    if (
      state.sections[chapterIndex] &&
      state.sections[chapterIndex][sectionIndex]
    ) {
      const existing = state.sections[chapterIndex][sectionIndex];
      state.sections[chapterIndex][sectionIndex] = {
        title: section.title ?? existing.title,
        position: section.position ?? existing.position,
      };
    }
  }),

  reset: action((state) => {
    state.formData = null;
    state.chapters = [];
    state.sections = [];
  }),
};
