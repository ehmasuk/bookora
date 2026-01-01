import bcrypt from "bcryptjs";
const hashPassword = (password) => {
    const salt = 10;
    return bcrypt.hashSync(password, salt);
};
const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
export { hashPassword, verifyPassword };
//# sourceMappingURL=passwordHandlers.js.map