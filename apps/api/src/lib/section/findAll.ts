import { Section } from "../../models/index.js";
import type { SortTypes } from "../../types/index.js";



export interface Props {
  filter?: object;
  select?: Record<string, string | number | boolean | object> | null;
  populate?: string[] | null;
  limit?: number;
  page?: number;
  sort?: SortTypes;
}
// find alll books
const findAll = async ({ filter = {}, select = null, populate = null, limit = 10, page = 1, sort = "ASC" }: Props) => {
  try {
    const query = Section.find(filter);
    query.limit(limit);
    // query.sort({ createdAt: sort === "ASC" ? 1 : -1 });
    query.sort({ position: 1 });
    const skip = (page - 1) * limit;
    query.skip(skip);
    if (populate && populate.length > 0) {
      populate.forEach((path) => query.populate(path));
    }
    if (select) {
      query.select(select);
    }
    const sections = await query.exec();
    return sections;
  } catch (error) {
    throw error;
  }
};

export default findAll;
