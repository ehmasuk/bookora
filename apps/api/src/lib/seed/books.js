import { faker } from "@faker-js/faker";
import { Book, Chapter, Section } from "../../models/index.js";
import findAll from "../user/findAll.js";
const books = async (count) => {
    try {
        const books = [];
        const chapters = [];
        const sections = [];
        const users = await findAll({});
        if (!users || users.length === 0)
            throw new Error("Seed users first");
        // create books
        const userIds = users?.map((user) => user._id);
        for (let i = 0; i < count; i++) {
            const randomNumber = Math.floor(Math.random() * (userIds.length - 1));
            books.push({
                title: faker.book.title(),
                author: userIds[randomNumber],
                summary: faker.lorem.sentences(),
                status: randomNumber % 2 === 0 ? "public" : "private",
            });
        }
        const seededBooks = await Book.insertMany(books);
        // create chapters
        const bookIds = seededBooks?.map((book) => book._id);
        for (let i = 0; i < bookIds.length - 1; i++) {
            for (let j = 0; j < 10; j++) {
                chapters.push({
                    title: faker.book.title(),
                    book: bookIds[i],
                    summary: faker.lorem.sentences(),
                    position: j,
                });
            }
        }
        const seededChapters = await Chapter.insertMany(chapters);
        // create sections
        const chapterIds = seededChapters?.map((chapter) => chapter._id);
        for (let i = 0; i < chapterIds.length - 1; i++) {
            for (let j = 0; j < 5; j++) {
                sections.push({
                    title: faker.person.firstName() + " " + (j + 1),
                    chapter: chapterIds[i],
                    position: j,
                });
            }
        }
        await Section.insertMany(sections);
        return seededBooks;
    }
    catch (error) {
        throw error;
    }
};
export default books;
//# sourceMappingURL=books.js.map