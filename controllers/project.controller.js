import models from "@/models/index.js";
import { asyncErrorHandler, Response, Error } from "express-error-catcher";
import { paginationValues } from "@/helper/index.js";
// import { projectSchema } from "@/validation/project.valdation.js";


export const addProject = asyncErrorHandler(async (req) => {
    const newProject = req.body;

    let condition = [{ pName: newProject.pName }];

    const exisitngProject = await models.Project.findOne({status: 0, $or: condition }).lean();

    if(exisitngProject){
        if(exisitngProject.pName === newProject.pName){
            throw new Error("Project name already exists", 400);
        }
    }

    let project = await models.Project(newProject).save();

    return new Response("Project added successfully", {data: project}, 200 );
});


export const listProject = asyncErrorHandler(async (req) => {
    let { limit, skip, sortBy } = paginationValues(req.query);    

    let { search } = req.query;

    let condition = {status: { $ne: 1 }};

    if(!isNull(search)){
        condition.$or = [
            { pName: { $regex: search, $options: 'i' } },
        ];
    }

    let count = await models.Project.countDocuments(condition);

    let data = await models.Project.find(condition)
    .populate('partner', OPTIONS_FIELD)
    .populate('manager', OPTIONS_FIELD)
    .populate('client', OPTIONS_FIELD)
    .populate('audit', OPTIONS_FIELD)
    .skip(skip).limit(limit).sort(sortBy).lean();

    return new Response("Project list", {count, data}, 200);
});

export const deleteProject = asyncErrorHandler(async (req) => {
    let userId = req.user?._id;

    let { other } = req.query;

    let deleteId = req.isAdmin ? other : userId;

    console.log("project delete id", deleteId, "other id", other);
    

    let project = await models.Project.findByIdAndUpdate(deleteId, { status: 1 });

    return new Response("Project deleted successfully", null, 200);
});

export const updateProject = asyncErrorHandler(async (req) => {
    let userId = req.user?._id;

    let editProject = req.body;

        console.log(editProject, "testtttttttt");


    let { other } = req.query;

    let exisitngProject = await models.Project.findOne({
        status: 0,
        _id: {$ne: other ?? userId}
    }).lean();

    if(exisitngProject){
        if(exisitngProject.pName === editProject.pName){
            throw new Error("Project name already exist", 400);
        }
    }

    let project = await models.Project.findByIdAndUpdate(other ?? userId, editProject);

    return new Response("Project updated successfully", null, 200)
});