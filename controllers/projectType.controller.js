import models from "@/models/index.js";
import { asyncErrorHandler, Response, Error } from "express-error-catcher";
import { paginationValues } from "@/helper/index.js";
// import { projectSchema } from "@/validation/project.valdation.js";


export const addProjectType = asyncErrorHandler(async (req) => {
    const newProjectType = req.body;

    let condition = [{ name: newProjectType.name }];

    const exisitngPtype = await models.ProjectType.findOne({status: 0, $or: condition }).lean();

    if(exisitngPtype){
        if(exisitngPtype.name === newProjectType.name){
            throw new Error("Project name already exists", 400);
        }
    }

    let project = await models.ProjectType(newProjectType).save();

    return new Response("Project type added successfully", {data: project}, 200 );
});

export const listProjectType = asyncErrorHandler(async (req) => {
    let { limit, skip, sortBy } = paginationValues(req.query);    

    let { search } = req.query;

    let condition = {status: { $ne: 1 }};

    if(!isNull(search)){
        condition.$or = [
            {name: { $regex: search, $options: 'i' }}
        ];
    }

    let count = await models.ProjectType.countDocuments(condition);

    let data = await models.ProjectType.find(condition)
    .skip(skip).limit(limit).sort(sortBy).lean();

    return new Response("Project type list", {count, data}, 200);
});


export const deleteProjectType = asyncErrorHandler(async (req) => {
    let userId = req.user?._id;

    let { other } = req.query;

    let deleteId = req.isAdmin ? other : userId;    

    let projectType = await models.ProjectType.findByIdAndUpdate(deleteId, { status: 1 });

    return new Response("Project type deleted successfully", null, 200);
});

export const updateProjectType = asyncErrorHandler(async (req) => {
    let userId = req.user?._id;

    let editProjectType = req.body;

    let { other } = req.query;

    let exisitngProjectType = await models.ProjectType.findOne({
        status: 0,
        _id: {$ne: other ?? userId}
    }).lean();

    if(exisitngProjectType){
        if(exisitngProjectType.name === editProjectType.name){
            throw new Error("Project type already exist", 400);
        }
    }

    let projectType = await models.ProjectType.findByIdAndUpdate(other ?? userId, editProjectType);

    return new Response("Project type updated successfully", null, 200)
});