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
    required: [true, "Username must be provided"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    unique: true,
    validate: (email: string) => validator.isEmail(email),
  },
  password: {
    type: String,
    required: [
      true,
      "Password is required to have 8 characters long and must contain 1 uppercase, 1 lowercase, 1 specical character and a number",
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
  },
  unit: { Number },
});

/// SIGNUP ----------

// ! Before we save to the database "pre-saving", we want to run some code.
// ! This code I'm going to run will hash the password before saving.
usersSchema.pre("save", function hashPassword(next) {
  // ! "this" is our document, it will have our email, password, and username available.
  // ! hashSync is a bcrypt function, it takes our password, plus a salt, and creates a unique hash.
  console.log("here is the password", this.password);
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  console.log("here is the updated password", this.password);
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
  message: "Error, email must be unique.",
});

export default mongoose.model<IUser>("User", usersSchema);
