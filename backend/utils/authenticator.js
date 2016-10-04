import jwt from 'jwt-simple';
import config from '../config';
import APIError from './APIError';
import httpStatus from 'http-status';
import User from '../resources/users/users.model';

/**
 * Generates a new JSON Web Token
 * @param {object} payload - The payload that will be encoded.
 * @param {number} life - The lifetime of the token (in days).
 * @returns {string}
 */
function generateToken(payload, expire) {
  const tokenPayload = payload;
  const now = new Date();
  tokenPayload.expire = expire || new Date(now.getTime() + (config.tokenLife * 1000 * 3600 * 24));

  return jwt.encode(tokenPayload, config.tokenSecret, 'HS512'); // 512 bits hash signature, fuck u NSA.
}

/**
 * Ensure a user is authenticated
 * @property {string} req.headers.authorization - The token for the user.
 */
function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return next(new APIError('No Authorization token present', httpStatus.UNAUTHORIZED));
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(new APIError('Token not correctly formatted', httpStatus.UNAUTHORIZED));
    }
    const payload = jwt.decode(token, config.tokenSecret, 'HS512');

    if ((new Date(payload.expire)).getTime() < (new Date).getTime()) {
      return next(new APIError('Token expired', httpStatus.UNAUTHORIZED));
    }

    /**
     * Better security compromising performance, each request DB is queried to ensure user still exists.
     * This is a low-traffic API, so is better ensure user still exists.
    */
    User.get(payload.user._id).then((user) => {
      req.user = user;    // eslint-disable-line no-param-reassign
      return next();
    }).catch((e) => {
      if (e.status === httpStatus.NOT_FOUND) {
        return next(new APIError('User no longer present in the system', httpStatus.UNAUTHORIZED));
      }
      next(new APIError('Impossible to fetch user'));
    });
  } catch (err) {
    logger.warn('Token invalid from: ', req.connection.remoteAddress, err);
    return next(new APIError('Token invalid. Incident reported.', httpStatus.UNAUTHORIZED));
  }
}

export default { generateToken, ensureAuthenticated };
