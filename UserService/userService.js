import User from "../model/userModel.js";
import brcypt from "bcrypt";

class userService {
  async handleUserRegistration(username, email, password) {
    const usernameCheck = await User.findOne(username);

    if (usernameCheck) {
      return res.join({ msg: "Username already exists", status: false });
    }
    const emailCheck = await User.findOne(email);
    if (emailCheck) {
      return res.join({ msg: "Email already exists", status: false });
    }

    const encryptedPassword = await brcypt.hash(JSON.stringify(password), 10);

    const stringUsername = JSON.stringify(username);
    const stringEmail = JSON.stringify(username);

    const user = await User.create({
      username: stringUsername,
      email: stringEmail,
      password: encryptedPassword,
    });
    delete user.password;
    return { status: true, user };
  }
}

export default userService;
