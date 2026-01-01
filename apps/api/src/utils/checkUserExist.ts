import { User } from "../models/index.js";

const checkUserExist = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) return false;

  return user;
};

export default checkUserExist;
