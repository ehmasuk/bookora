import type { Response, NextFunction } from "express";

import { Model } from "mongoose";

import newErros from "../utils/newError.js";
import newError from "../utils/newError.js";
import type { CustomRequest } from "../types/index.js";



interface Params {
  model: Model<any>;
  paramName: string;
  ownerField: string;
}

const isOwned = ({ model, paramName, ownerField }: Params) =>
  async (req: CustomRequest, _res:Response, next:NextFunction) => {
    // get user id from header to know logedin user's id
    const userId = req.user?.id;
    if (!userId) throw newErros({ message: "Unauthorized", statusCode: 401 });

    //  get the id from param to know the resource id that user calim to own
    const itemId = req.params[paramName];
    if (!itemId) throw newErros({ message: "Resource not found", statusCode: 400 });

    // get the item from given model by the id from param
    const info = await model.findById(itemId);
    if (!info) throw newErros({ message: "Resource not found", statusCode: 404 });

    // check the item is owned by the user coparing the owenerShip field with userId
    if (!(info[ownerField] == userId)) {
      throw newError({ message: "Forbidden", statusCode: 409 });
    }
    next();
  };

export default isOwned;
