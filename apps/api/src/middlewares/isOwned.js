import { Model } from "mongoose";
import newErros from "../utils/newError.js";
import newError from "../utils/newError.js";
const isOwned = ({ model, paramName, ownerField }) => async (req, _res, next) => {
    // get user id from header to know logedin user's id
    const userId = req.user?.id;
    if (!userId)
        throw newErros({ message: "Unauthorized", statusCode: 401 });
    //  get the id from param to know the resource id that user calim to own
    const itemId = req.params[paramName];
    if (!itemId)
        throw newErros({ message: "Resource not found", statusCode: 400 });
    // get the item from given model by the id from param
    const info = await model.findById(itemId);
    if (!info)
        throw newErros({ message: "Resource not found", statusCode: 404 });
    // check the item is owned by the user coparing the owenerShip field with userId
    if (!(info[ownerField] == userId)) {
        throw newError({ message: "Forbidden", statusCode: 409 });
    }
    next();
};
export default isOwned;
//# sourceMappingURL=isOwned.js.map