import { users } from '../db/db';

class UsersController {
  static getAllUserss(req, res) {
    try {
      return res.status(200).json(answers);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default UsersController;
