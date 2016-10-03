import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
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
  list() {
    return this.find({});
  }
};

export default mongoose.model('Message', MessageSchema);
