export default class userController {
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
    } catch (error) {
      console.log(error);
    }
  }
}
