import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import httpStatus from 'http-status';
import APIError from '../../utils/APIError';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    hash: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    }    
  },
  picture: {
    type: String
  },
  status: {
    type: String
  },
  online: {
    type: Boolean,
    default: false
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.method({
});

UserSchema.statics = {
   /**
   * Find a user by its username
   * @param {string} username - The username of the user.
   * @returns {Promise<User>}
   */ 
  getByUsername(username){
    return this.findOne({ username })
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('User not found', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
   * List users in descending order of 'joinedAt' date, paginating them.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @param {string} sort - Sort by this field.
   * @param {string} filter - Filter by including this string in the name.
   * @returns {Promise<{docs: User[], total: Integer, limit: Integer, offset: Integer}>}
   */
  list({ sort = '-joinedAt', filter = '', skip = 0, limit = 50 } = {}) {
    return this.paginate({ name: new RegExp(filter, 'i') }, {
      sort, offset: skip, limit,
      select: { _id: 0, __v: 0, password: 0 }
    });
  }
};

UserSchema.plugin(mongoosePaginate);
export default mongoose.model('User', UserSchema);
