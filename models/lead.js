import { Schema, model } from "mongoose";
import COLLECTIONS from "@/config/collections"

const schema = new Schema({
    firstName: {type : String, trim: true},
    lastName: {type : String, trim: true},
    mobile: {type : String, trim: true},
    email: {type : String, trim: true},
    
    },
    {timestamps: true}
);

export default model(COLLECTIONS.LEADS, schema);