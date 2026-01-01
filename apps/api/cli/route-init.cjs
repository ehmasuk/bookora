const fs = require("fs");
const path = require("path");
const args = process.argv

// routes
const routesDirectory = path.resolve(__dirname, "../src/routes");
const routeFileContent = `
import {Router} from "express";
const router:Router = Router();
// routes
export default router;
`;

// controllers
const controllerDirectory = path.resolve(__dirname, "../src/controllers");
const controllerFileContent = `
const controller = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export { controller };
`;

const createFile = (fileName, destination, content) => {
  const dest = path.join(destination, fileName);
  if (fs.existsSync(dest)) {
    console.log(dest, " file already exists");
    return;
  }
  fs.writeFile(dest, content, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${fileName} created in ${dest}`);
    }
  });
};

// create route
createFile(`${args[2]}.ts`, routesDirectory, routeFileContent);

// create controller
createFile(`${args[2]}.ts`, controllerDirectory, controllerFileContent);
