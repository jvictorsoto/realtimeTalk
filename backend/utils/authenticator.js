import jwt from 'jwt-simple';
import httpStatus from 'http-status';
import config from '../config';
import APIError from './APIError';

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

    if ((new Date(payload.expire)).getTime() < (new Date()).getTime()) {
      return next(new APIError('Token expired', httpStatus.UNAUTHORIZED));
    }

    req.user = payload.user.username; // eslint-disable-line no-param-reassign
    return next();
  } catch (err) {
    console.warn('Token invalid from: ', req.connection.remoteAddress, err);
    return next(new APIError('Token invalid. Incident reported.', httpStatus.UNAUTHORIZED));
  }
}

export default { generateToken, ensureAuthenticated };
