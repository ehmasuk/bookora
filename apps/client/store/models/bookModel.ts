import { Action, action } from "easy-peasy";

export interface BookModelType {
  bookIsUpdating: boolean;
  setBookIsUpdating: Action<BookModelType, boolean>;
}

export const bookModel: BookModelType = {
  //states
  bookIsUpdating: false,

  // actions
  setBookIsUpdating: action((states, payload: boolean) => {
    states.bookIsUpdating = payload;
  }),
};
