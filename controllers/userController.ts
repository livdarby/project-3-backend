import { Request, Response } from "express";
import User, { checkPasswords, validatePassword } from "../models/userModel";
import { SECRET } from "../config/environment";
import formatValidationError from "../errors/validation";

import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
  try {
    if (checkPasswords(req.body.password, req.body.confirmPassword)) {
      const user = await User.create(req.body);
      res.send(user);
    } else {
      res
        .status(400)
        .send({
          errors: {
            password:
              "Hmm... appears you're having issues typing 🧐 please try again...",
          },
        });
    }
  } catch (e) {
    res.status(400).send({
      message: "There was an error.",
      errors: formatValidationError(e),
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const password = req.body.password;

    const user = await User.findOne({ email: req.body.email });

    if (!user || !password)
      return res
        .status(401)
        .send({ message: "Login failed. Please try again" });

    const isValidPw = validatePassword(password, user.password);

    if (isValidPw) {
      const token = jwt.sign(
        { userId: user._id }, 
        SECRET, 
        { expiresIn: "24h" } 
      );

      res.send({ message: "Login successful", token }); // ! Add the token to the response
    } else {
      res.status(401).send({ message: "Login failed. Please try again" });
    }
    res.send(req.body);
  } catch (e) {}
}

export async function getCurrentUser(req: Request, res: Response) {
  try {
    res.status(200).send(res.locals.currentUser);
  } catch (e) {
    res
      .status(500)
      .send({ message: "There was an error please try again later." });
  }
}
