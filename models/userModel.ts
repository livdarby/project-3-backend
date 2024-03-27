import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";
import validator from "validator";
import mongooseHidden from "mongoose-hidden";

interface IUser {
  userName: string;
  email: string;
  password: string;
  unit: number;
}

const usersSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  userName: {
    type: String,
    required: [true, "You must provide a valid username"],
  },
  email: {
    type: String,
    required: [true, "You must provide a valid email address"],
    unique: true,
    validate: (email: string) => validator.isEmail(email),
  },
  password: {
    type: String,
    required: [
      true,
      "Password is required to have 8 characters long and must contain at least 1 uppercase, 1 lowercase, 1 specical character and a number",
    ],
    minlength: 8,
    validate: (password: string) => {
      return validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      });
    },
    message:
      "Password must contain at least 1 uppercase, 1 lowercase, 1 special character, and a number",
  },
  unit: { Number },
});

/// SIGNUP ----------

// ! Before we save to the database "pre-saving", we want to run some code.
// ! This code I'm going to run will hash the password before saving.
usersSchema.pre("save", function hashPassword(next) {
  // ! "this" is our document, it will have our email, password, and username available.
  // ! hashSync is a bcrypt function, it takes our password, plus a salt, and creates a unique hash.
  // console.log("here is the password", this.password);
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  // console.log("here is the updated password", this.password);
  // ! Call next() to tell mongoose we're done.
  next();
});

export function validatePassword(
  loginPlaintextPassword: string,
  originalHashedPassword: string
) {
  return bcrypt.compareSync(loginPlaintextPassword, originalHashedPassword);
}

export function checkPasswords(password: string, confirmPassword: string) {
  return password == confirmPassword;
}

usersSchema.plugin(mongooseHidden({ defaultHidden: { password: true } }));

usersSchema.plugin(uniqueValidator, {
  message: "You must provide a new email address",
});

usersSchema.post("validate", function (error: any, _doc: any, next: any): any {
  if (
    error.errors &&
    error.errors.password &&
    error.errors.password.kind === "user defined"
  ) {
    error.errors.password.message = "Invalid password. Please try again.";
  }
  next(error);
});

usersSchema.post("validate", function (error: any, _doc: any, next: any): any {
  if (
    error.errors &&
    error.errors.email &&
    error.errors.email.kind === "user defined"
  ) {
    error.errors.email.message = "Invalid email. Please try again.";
  }
  next(error);
});

export default mongoose.model<IUser>("User", usersSchema);
