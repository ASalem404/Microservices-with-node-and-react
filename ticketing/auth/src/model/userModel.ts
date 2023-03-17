import mongoose from "mongoose";
import { Password } from "../services/password";

// ! an interface to enforce ourselfs to put a correct arguments when creating user.
interface UserAtters {
  email: string;
  password: string;
}

// An interface describes what a single user has.

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(atters: UserAtters): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.statics.build = (atters: UserAtters) => {
  return new User(atters);
};

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
