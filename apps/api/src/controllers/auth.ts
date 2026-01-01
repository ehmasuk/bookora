import type { RequestHandler } from "express";

import type { Types } from "mongoose";
import userServices from "../lib/user/index.js";
import checkUserExist from "../utils/checkUserExist.js";
import newError from "../utils/newError.js";
import { verifyPassword } from "../utils/passwordHandlers.js";
import successResponse from "../utils/successResponse.js";
import { createToken } from "../utils/tokenHandlers.js";
import { userLoginSchema, userRegisterSchema } from "../zodSchemas/userSchemas.js";

export interface AuthResponseTypes {
  id: Types.ObjectId;
  name: string;
  email: string;
  status: string[];
}

// register User
const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = userRegisterSchema.parse(req.body);

    // create a new user
    let newuser = await userServices.createOne({ name, email, password });

    const userResponse: AuthResponseTypes = {
      id: newuser._id,
      name: newuser.name,
      email: newuser.email,
      status: newuser.status,
    };

    // create token
    const token = createToken(userResponse.id);

    successResponse({ res, statusCode: 201, data: userResponse, extra: { token } });
  } catch (error) {
    next(error);
  }
};

// login User
const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = userLoginSchema.parse(req.body);

    // check user exist
    const user = await checkUserExist(email);
    if (!user) throw newError({ message: "Authentication failed", statusCode: 401 });

    // check password
    const validPass = await verifyPassword(password, user.password);
    if (!validPass) throw newError({ message: "Authentication failed", statusCode: 401 });

    const userResponse: AuthResponseTypes = {
      id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
    };

    // create token
    const token = createToken(userResponse.id);

    // send response
    successResponse({ res, statusCode: 200, data: userResponse, extra: { token } });
  } catch (error) {
    next(error);
  }
};

export type AuthControllersType = {
  loginUser: RequestHandler;
  registerUser: RequestHandler;
};

const authControllers: AuthControllersType = {
  loginUser,
  registerUser,
};

export default authControllers;
