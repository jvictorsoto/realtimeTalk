import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const MessageSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

MessageSchema.method({
});

MessageSchema.statics = {
  /**
   * List messages of a chat in descending order of 'date' date, paginating them.
   * @param {number} skip - Number of messages to be skipped.
   * @param {number} limit - Limit number of messages to be returned.
   * @param {string} sort - Sort by this field.
   * @param {string} filter - Filter by including this string in the name.
   * @param {string} chat - The ObjectId of the chat.
   * @returns {Promise<{docs: User[], total: Integer, limit: Integer, offset: Integer}>}
   */
  list({ sort = 'date', skip = 0, limit = 50, filter = '', chat = '' } = {}) {
    return this.paginate({ chat, text: new RegExp(filter, 'i') }, {
      sort, offset: skip, limit, select: { _id: 0, __v: 0, password: 0 }
    });
  }
};

MessageSchema.plugin(mongoosePaginate);
export default mongoose.model('Message', MessageSchema);
