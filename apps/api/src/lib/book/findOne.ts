import { Book } from "../../models/index.js";

export interface Props {
  filter: object;
  populate?: string[] | null;
  select?: Record<string, string | number | boolean | object> | null;
}

const findOne = async ({ filter, populate = null, select = null }: Props) => {
  try {
    const query = Book.findOne(filter);

    if (populate) {
      populate.forEach((path) => query.populate(path));
    }

    if (select) {
      query.select(select);
    }

    return await query.exec();
  } catch (error) {
    throw error;
  }
};

export default findOne;
