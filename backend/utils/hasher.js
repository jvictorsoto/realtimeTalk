import crypto from 'crypto';

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length);   /** return required number of characters */
}

/**
 * Hash password with sha512 with a given salt.
 * @function
 * @param {string} password -  The password to hash.
 * @param {string} salt - The salt to be used in the hashing.
 * @returns {{hash, salt}}
 */
function sha512(password, salt) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return { salt, hash: value };
}

/**
 * Hash with a random generated salt a password.
 * @param {string} password - The password to hash.
 * @returns {{hash, salt}}
 */
function saltHashPassword(password) {
  const salt = genRandomString(16);
  return sha512(password, salt);
}

export default { sha512, saltHashPassword };