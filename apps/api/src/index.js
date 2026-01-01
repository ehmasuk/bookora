import http from "http";
import app from "./app.js";
import connectDb from "./db/connectDb.js";
// create a node server so that we can use it later with socket
const server = http.createServer(app);
const port = 8080;
const startListening = () => {
    server.listen(port, () => {
        console.log(`Server is running in http://localhost:${port}`);
    });
};
connectDb()
    .then(() => {
    console.log("Database connected");
    startListening();
})
    .catch((err) => {
    console.error("Error connecting database: ", err.message);
});
//# sourceMappingURL=index.js.map