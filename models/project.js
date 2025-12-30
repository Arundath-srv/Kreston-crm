import COLLECTIONS from "@/config/collections.js";
import { model, Schema } from "mongoose";

const schema = new Schema(
    {
        pName: {type: String, trim: true},
        client: { type: Schema.Types.ObjectId, ref: COLLECTIONS.CLIENTS },
        pType: { type: Number, enum:[1,2,3,4], description: "1 - Audit, 2 - Tax, 3 - Valuation, 4 - ICV"},
        year: { type: String },
        partner: { type: Schema.Types.ObjectId, ref: COLLECTIONS.USERS },
        manager: { type: Schema.Types.ObjectId, ref: COLLECTIONS.USERS },
        reviewer: { type: String },
        pStatus: { type: Number, enum: [1,2,3,4,5], description: "1 - Completed, 2 - In Progress, 3 - On Hold, 4 - Not Started, 5 - Cancelled" },
        feeStatus: { type: Number, enum: [1,2,3], description: "1 - Paid, 2 - Unpaid, 3 - Partially Paid" },
        status: { type: Number, default: 0, enum: [0, 1] }
    },
    {
        timestamps: true, collection: COLLECTIONS.PROJECTS
    }
);

export default model(COLLECTIONS.PROJECTS, schema);
