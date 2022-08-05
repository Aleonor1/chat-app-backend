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
    const stringEmail = JSON.stringify(email);

    const user = await User.create({
      username: stringUsername,
      email: stringEmail,
      password: encryptedPassword,
    });
    delete user.password;
    return { status: true, user };
  }

  async handleUserLogin(username, password) {
    const stringUsername = JSON.stringify(username);
    const stringPassword = JSON.stringify(password);

    const dbUser = await User.findOne({ stringUsername });

    if (!dbUser) {
      return { msg: "Incorrect username or password", status: false };
    }
    const isPasswordValid = await brcypt.compare(
      stringPassword,
      dbUser.password
    );
    if (!isPasswordValid) {
      return { msg: "Incorrect username or password", status: false };
    }
    delete dbUser.password;

    return { status: true, dbUser };
  }

  async handleChangeAvatar(userId, avatarImage) {
    try {
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  }

  async setAvatar(userId, avatarImage, userData) {
    try {
      const userData = await User.findById(userId, {
        isAvatarImageSet: true,
        avatarImage,
      });
      return { isSet: userData.isAvatarImageSet, image: userData.avatarImage };
    } catch (error) {
      next(error);
    }
  }
}

export default userService;
