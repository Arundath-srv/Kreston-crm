import { paginationValues } from "@/helper/index.js";
import models from "@/models/index.js";
import { clientSchema } from "@/validation/client.validation.js";
import { asyncErrorHandler, Response, Error } from "express-error-catcher";

export const addClient = asyncErrorHandler(async (req) => {

    const newClient = await clientSchema(req.body);

    let condition = [{ firstName: newClient.firstName }];

    if (!isNull(newClient.mobile)) {
        condition.push({ mobile: newClient.mobile });
    }

    if (!isNull(newClient.email)) {
        condition.push({ email: newClient.email });
    }

    const existingClient = await models.Client.findOne({ status: 0, $or: condition }).lean();

    if (existingClient) {
        if (existingClient.firstName === newClient.firstName) {
            throw new Error("Name already exists", 400);
        }

        if (existingClient.email === newClient.email) {
            throw new Error("Email already exists", 400);
        }

        if (existingClient.mobile === newClient.mobile) {
            throw new Error("Mobile number already exists", 400);
        }
    }

    newClient.addedBy = req.user?._id;

    let client = await new models.Client(newClient).save();

    return new Response("Client added successfully", { data: client }, 200);

});

export const listClient = asyncErrorHandler(async (req) => {
    let { skip, limit, sortBy } = paginationValues(req.query);
    let { search } = req.query;
    let condition = { status: { $ne: 1 } };

    if (!isNull(search)) {
        condition.$or = [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { mobile: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }

    let count = await models.Client.countDocuments(condition);

    let data = await models.Client.find(condition)
    .populate("addedBy", OPTIONS_FIELD)
    .populate("manager", OPTIONS_FIELD)
    .populate("partner", OPTIONS_FIELD)
    .skip(skip).limit(limit).sort(sortBy).lean();    

    return new Response("Client list", {count, data}, 200)
});

export const deleteClient = asyncErrorHandler(async (req) => {
    let userId = req.user?._id;

    let {other} = req.query;

    let deleteId = req.isAdmin ? other : userId;    

    let client = await models.Client.findByIdAndUpdate(deleteId, {status: 1});

    return new Response("User Deleted successfully", null, 200);
});

export const updateClient = asyncErrorHandler(async (req) => {
    let userId = req.user?._id;

    let editClient = await clientSchema(req.body);    

    let { other } = req.query;    
    
    if(!isNull(editClient.mobile)){
        condition.push({mobile: editClient.mobile});
    }

    if(!isNull(editClient.email)){
        condition.push({email: editClient.email});
    }

    const existingClient = await models.Client.findOne({
        status: 0,
        _id: {$ne: other ?? userId},
    }).lean();    

    if (existingClient) {
        
        if (existingClient.email === editClient.email) {
            throw new Error("Email already exists", 400);
        }

        if (existingClient.mobile === editClient.mobile) {
            throw new Error("Mobile number already exists", 400);
        }
    }

    let client = await models.Client.findByIdAndUpdate(other ?? userId, editClient);

    return new Response("Client updated successfully", null, 200)
});