import { users } from '../db/db';

class UsersController {
  static getAllUsers(req, res) {
    try {
      return res.status(200).json(answers);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default UsersController;
