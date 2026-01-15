import { Action, action } from "easy-peasy";

export interface BookModelType {
  bookIsUpdating: boolean;
  setBookIsUpdating: Action<BookModelType, boolean>;
  bookSidebarIsOpen: boolean;
  setBookSidebarIsOpen: Action<BookModelType, boolean>;
}

export const bookModel: BookModelType = {
  //states
  bookIsUpdating: false,
  bookSidebarIsOpen: true,

  // actions
  setBookIsUpdating: action((states, payload: boolean) => {
    states.bookIsUpdating = payload;
  }),
  setBookSidebarIsOpen: action((states, payload: boolean) => {
    states.bookSidebarIsOpen = payload;
  }),
};
