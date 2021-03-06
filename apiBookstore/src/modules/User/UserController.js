import User from './UserModel';
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import env from '../../config/env'
import ForbiddenError from '../../helpers/errors/403_forbidden';
import BadRequestError from '../../helpers/errors/400_bad_request';

class UserController {
  #models;
  constructor(models) {
    this.#models = models;
  }

  getAll = async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  register = async (req, res, next) => {
    try {
      const { firstName, email, password } = req.body;
      const emailExists = await User.findOne({
        where: {
          email: email,
        },
      });
      if (emailExists) {
        throw new BadRequestError('This is user already exist');
      } else {
        
        const hash = await bcrypt.hash(password, 10);
        const userRegister = await User.create({
          email,
          firstName,
          password: hash
        });
        res.status(201).json(userRegister);

      }
    } catch (error) {
      next(error);
    }
  }
  login = async (req, res, next) => {
    try {
      const { email, password } = { ...req.body };

      if (!email || !password)
        throw new ForbiddenError('Il manque des informations. Veuillez remplir tous les champs');

      const user = await User.findOne({ where: { email } });
      if (!user)
        throw new ForbiddenError("Oups je connais pas Cet utilisateur (email).");
      const result = await bcrypt.compare(password, user.password);
      if (!result)
        throw new ForbiddenError("Oups Le mot de passe est incorrect.");

      const token = await Jwt.sign({ id: user.id }, env.jwt_secret);
      user.access_token = Jwt.sign({ id: user.id, email: user.email }, env.jwt_secret, { expiresIn: '5m' });
      user.refresh_token = Jwt.sign({ id: user.id }, env.jwt_secret, { expiresIn: '60d' });
      await user.save();
      res.header('Autorisation', `Bearer ${token}`);
      res.cookie('refresh_token', user.refresh_token, { expiresIn: '60d', httpOnly: 'true' });
      res.status(200).json('User bien connecter avec succes')
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
