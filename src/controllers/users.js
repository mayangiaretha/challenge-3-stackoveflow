import usersModel from '../models/users';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

class UsersController {
  static async registerAUser(req, res) {
    try {
      const { firstName, lastName, email, password, createdAt } = req.body;

      const oldUser = await usersModel.findOne({ email });
      if (oldUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const newUser = new usersModel({
        userId: uuidv4(),
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: encryptedPassword,
        createdAt: dayjs().format('YYYY-MM-DD h:mm:ss A'),
      });

      await usersModel.create(newUser);
      return res.status(201).json({
        userID: uuidv4(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: '******',
      });
    } catch (error) {
      console.log(error);
      // return res.status(401).json({ message: error });
    }
  }

  static async loginUser(req, res) {
    try {
      const { password, email } = req.body;
      const user = await usersModel.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Wrong Email' });
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword)
        return res.status(400).json({ message: 'Invalid Password' });

      const token = jwt.sign({ Id: uuidv4(), email }, process.env.TOKEN_KEY);
      return res.status(200).json({ token });
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default UsersController;
