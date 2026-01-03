import { model, Schema } from "mongoose";
import COLLECTIONS from "@/config/collections.js";

const newSchema = new Schema({
    name: { type: String, trim: true },
    remarks: { type: String },
    addedBy: { type: Schema.Types.ObjectId, ref: COLLECTIONS.USERS },
    status: { type: Number, default: 0, enum: [0, 1] },

},
    {
        timestamps: true, collection: COLLECTIONS.PROJECT_TYPES
    }
);

export default model(COLLECTIONS.PROJECT_TYPES, newSchema);

