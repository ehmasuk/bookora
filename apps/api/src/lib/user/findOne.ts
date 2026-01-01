import { User } from "../../models/index.js";

export interface Props {
  filter: object;
  populate?: string[] | null;
}

const findOne = async ({ filter, populate = null }: Props) => {
  try {
    const query = User.findOne(filter);

    if (populate) {
      populate.forEach((item) => query.populate(item));
    }

    return await query.exec();
  } catch (error) {
    throw error;
  }
};

export default findOne;
