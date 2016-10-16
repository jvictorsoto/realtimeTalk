import httpStatus from 'http-status';
import User from './users.model';
import hasher from '../../utils/hasher';
import authenticator from '../../utils/authenticator';
import { io } from '../events';


/**
* Find a user by its username
* @param {string} username - The username of the user.
* @returns {Promise<User>}
*/
function create(req, res, next) {
  const user = new User(req.body);
  user.password = hasher.saltHashPassword(req.body.password);
  user.save()
    .then(() => {
      res.status(httpStatus.CREATED).send({ msg: 'User created successfully.' })
    })
    .catch(reason => {
      if (reason.code === 11000) {
        return res.status(httpStatus.CONFLICT).json({ msg: 'username already taken' });
      }
      return next(reason);
    });
}


/**
* List users
* @property {string} req.body.username - The username of the user
* @property {string} req.body.password - The password of the user
* @returns {{profile: { username: String, name: String, picture: String, status: String}, token: String }}
*/
function signin(req, res, next) {
  User.getByUsername(req.body.username)
    .then(user => {
      // Calculate the hash of the received password using the stored salt and check if matches stored one
      const genPasssword = hasher.sha512(req.body.password, user.password.salt);
      if (genPasssword.hash !== user.password.hash) {
        return res.status(httpStatus.UNAUTHORIZED).json({ msg: 'Invalid credentials' });
      }

      // login is success generate token and response
      const payload ={
        profile: {
          username: user.username,
          name: user.name,
          email: user.email,
          picture: user.picture,
          status: user.status
        },
        token: authenticator.generateToken({ user: { _id: user._id, username: user.username } })
      };

      res.json(payload);
    })
    .catch(reason => {
      next(reason);
    });
}

/**
* List users
* @property {string} req.query.sort - The sorting preffered mode in mongoose spec
* @property {string} req.query.filter - Filter results by this string
* @property {number} req.query.skip - The number of users to skip
* @property {number} req.query.limit - The max number of users to return
* @returns {{docs: User[], total: Integer, limit: Integer, offset: Integer}}
*/
function list(req, res, next) {
  const { sort = '-joinedAt', filter = '', skip = 0, limit = 50 } = req.query;
  User.list({ sort, filter, limit, skip })
    .then((data) => res.json(data))
    .catch((reason) => {
      next(reason);
    });
}

export default { create, signin, list };
