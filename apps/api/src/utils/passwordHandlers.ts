import bcrypt from "bcryptjs";

const hashPassword = (password: string) => {
  const salt = 10;
  return bcrypt.hashSync(password, salt);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, verifyPassword };
