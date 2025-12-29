import COLLECTIONS from "@/config/collections.js";
import { Schema, model } from "mongoose";


const schema = new Schema(
    {
        firstName: {type: String, trim: true},
        lastName: {type: String, trim: true},
        mobile: {type: String, trim: true},
        email: {type: String, trim: true},
        address: {type: String, trim: true},
        referral: {type: String, trim: true},

        status: { type: Number, default: 0, enum: [0, 1, 2], description: "0 - active, 1 - deleted, 2 - blocked or inactive" },

        manager: {type: Schema.Types.ObjectId, ref: COLLECTIONS.USERS},
        partner: {type: Schema.Types.ObjectId, ref: COLLECTIONS.USERS},

        addedBy: {type: Schema.Types.ObjectId, ref: COLLECTIONS.USERS},
        updatedBy: {type: Schema.Types.ObjectId, ref: COLLECTIONS.USERS}
    },

    {timestamps: true, collection: COLLECTIONS.CLIENTS}
);


export default model(COLLECTIONS.CLIENTS, schema);