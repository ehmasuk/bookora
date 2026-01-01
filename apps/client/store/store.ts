import { createStore } from "easy-peasy";
import { bookModel, BookModelType } from "./models/bookModel";

export interface StoreType {
  book: BookModelType;
}

const store = createStore<StoreType>({
  book: bookModel,
});

export default store;
