import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const ChatSchema = new mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true
  },
  owner: {
    type: String,
    required: true
  },
  private: {
    type: Boolean,
    default: false
  },
  users: [String],
  lastActivityAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ChatSchema.method({
});

ChatSchema.statics = {
  /**
   * List chats in descending order of '-lastActivityAt' date, paginating them.
   * Only public chats or private ones including the current user are return
   * @param {number} skip - Number of chats to be skipped.
   * @param {number} limit - Limit number of chats to be returned.
   * @param {string} sort - Sort by this field.
   * @param {string} username - The current user.
   * @param {string} filter - Filter by including this string in the title.
   * @returns {Promise<{docs: User[], total: Integer, limit: Integer, offset: Integer}>}
   */
  list({ sort = '-lastActivityAt', skip = 0, limit = 50, filter = '', username = '' } = {}) {
    return this.paginate({ $or: [{ title: new RegExp(filter, 'i'), private: false },
      { title: new RegExp(filter, 'i'), private: true, users: username },
      { title: new RegExp(filter, 'i'), private: true, owner: username }] },
      { sort, offset: skip, limit, select: { __v: 0, users: 0 } });
  },
  /**
   * Update a the lastActivity of a Chat by its id.
   * @param {string} chatId - The id of the chat
   * @returns {Promise<Update>}
   */
  updateChatActivy(chatId) {
    return this.update({ _id: chatId }, { $set: { lastActivityAt: new Date() } });
  }
};

ChatSchema.plugin(mongoosePaginate);
export default mongoose.model('Chat', ChatSchema);
