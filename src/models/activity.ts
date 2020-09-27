import mongoose, { Document, Schema } from 'mongoose';

export interface ActivityInterface extends Document {
    ipAddress: string;
    activity: string;
}

const ActivitySchema: Schema = new Schema({
    ipAddress: { type: String, required: true },
    type: { type: String, required: true },
});

const Activity = mongoose.model<ActivityInterface>('Activity', ActivitySchema);

export default Activity;
