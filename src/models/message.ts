import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
    content: string;
    sender: string;
    timestamp: Date;
}

const messageSchema: Schema = new Schema({
    content: { type: String, required: true },
    sender: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IMessage>('Message', messageSchema);