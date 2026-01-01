import { faker } from "@faker-js/faker";
import { User } from "../../models/index.js";
const users = async (count) => {
    try {
        const users = [];
        for (let i = 0; i < count; i++) {
            const randomNumber = Math.floor(Math.random() * 100);
            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email().toLocaleLowerCase(),
                password: faker.internet.password(),
                status: randomNumber % 2 === 0 ? "verified" : "unverified",
            });
        }
        const newUers = await User.insertMany(users);
        return newUers;
    }
    catch (error) {
        throw error;
    }
};
export default users;
//# sourceMappingURL=users.js.map