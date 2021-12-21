const user = require('./userModel');
const bcrypt = require('bcrypt');
const env = require('../../config/env');
const BadRequestError = require('../../helpers/errors/400_bad_request');
const jwt = require('jsonwebtoken');
const { CREATED } = require('../../helpers/StatusCode');

const userController = {

    getAll: async (req, res, next) => {
        try {
            const users = await user.findAll();
            res.status(201).json(users);
        } catch (err) {
            console.log(err, "GET ALL user");
            next(err);
            console.log(err);
        }
    },
    register: async (req, res, next) => {
        try {
          const { first_name, email, password } = req.body;
          
          const emailExists = await user.findOne({
              where: {
                email: email,
              },
          });
          //je suis de retour
          if(emailExists) {
            throw new BadRequestError('This is user already exist');  
          } else {
            const salt = parseInt(env.salt_rounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const user = await user.create({
              first_name,
              email,
              password: hashedPassword,
            });
            console.log(user,"After create");
            res.status(201).json( user );
          }
        } catch (err) {
          console.log(err,"ERROOR REGISTER user");
          next(err);
        }
      },

      login: async (req, res, next) => {
        try {
          console.log(req.body);
          const { email, password } = req.body;
          const user = await user.findOne({
            where: { email }
          });
          if (!user) {
            throw new BadRequestError("Sorry! Account does not exists .")
          } else {
            console.log("LOGIN req body after veriyemail", user);
            const verifyPasswordBcrypt = await bcrypt.compare(password, user.password);
            if(!verifyPasswordBcrypt) {
              throw new BadRequestError("Your password is false .");
            } else {
              user.access_token = jwt.sign({ id: user.id , email: user.email }, env.jwt_secret, { expiresIn: '5m' });
              user.refresh_token = jwt.sign({ id: user.id }, env.jwt_secret, { expiresIn: '60d' });
              await user.save();
              res.cookie('refresh_token', user.refresh_token, { expiresIn: '60d', httpOnly: 'true'});
              res.status(CREATED).json('Hello user ' + user.first_name);
            }

          }
        } catch (err) {
          console.error("LOGIN ERROR", err)
            next(err);
        }
    },
};
module.exports = userController