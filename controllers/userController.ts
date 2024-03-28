import { Request, Response } from "express";
import User, { checkPasswords, validatePassword } from "../models/userModel";
import { SECRET } from "../config/environment";
import formatValidationError from "../errors/validation";

// ! import JWT
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
  try {
    // console.log("req.body", req.body);
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
    // console.log(e);
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
      // ! Make a unique token (JWT) for this user.
      const token = jwt.sign(
        // makes a new token!
        { userId: user._id }, // we're encoding the user id on the token as userId
        SECRET, // we are then passing through a secret only we know.
        { expiresIn: "24h" } // and an expiry of the token
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
    // console.log("current user:", res.locals.currentUser);
    res.status(200).send(res.locals.currentUser);
  } catch (e) {
    res
      .status(500)
      .send({ message: "There was an error please try again later." });
  }
}
