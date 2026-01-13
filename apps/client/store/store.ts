import { createStore } from "easy-peasy";
import { bookModel, BookModelType } from "./models/bookModel";
import {
  generateBookModel,
  GenerateBookModelType,
} from "./models/generateBookModel";

export interface StoreType {
  book: BookModelType;
  generateBook: GenerateBookModelType;
}

const store = createStore<StoreType>({
  book: bookModel,
  generateBook: generateBookModel,
});

export default store;
