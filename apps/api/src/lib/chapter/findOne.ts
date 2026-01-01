import { Chapter } from "../../models/index.js";

export interface Props {
  filter: object;
  populate?: string[] | null;
}


// find one chapter
const findOne = async ({ filter, populate = null }: Props) => {
  try {
    const query = Chapter.findOne(filter);

    if (populate) {
      populate.forEach((path) => query.populate(path));
    }

    return await query.exec();
  } catch (error) {
    throw error;
  }
};

export default findOne;
