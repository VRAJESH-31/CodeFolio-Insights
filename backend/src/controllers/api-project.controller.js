import asyncHandler from "../utils/async-handler.util.js";
import * as apiProjectService from "../services/api-project.service.js";

const getProjects = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const projects = await apiProjectService.getProjects(userId);
    return res.status(200).json(projects);
});

const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user._id;

    const project = await apiProjectService.getProjectById(projectId, userId);
    if (!project) throw new ApiError(404, "Project not found");
    return res.status(200).json(project);
});

const createProject = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const userId = req.user._id;

    const project = await apiProjectService.createProject(name, userId);
    return res.status(201).json({message: "New Project created", project: project});
});

const updateProject = asyncHandler(async (req, res) => {
    const { projectId, name } = req.body;
    const userId = req.user._id;

    const project = await apiProjectService.updateProject(projectId, name, userId);
    if (!project) throw new ApiError(404, "Project not found or you are not authorized to update the poject.");
    return res.status(200).json({message: "Project name updated", project: project});
});

const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user._id;

    const project = await apiProjectService.deleteProject(projectId, userId, req.user.apiKey);
    return res.status(200).json({message: "Project deleted successfully", deletedProject: project});
});

const changeDailyApiLimit = asyncHandler(async (req, res) => {
    const { projectId, newApiPointsDailyLimit } = req.body;
    await apiProjectService.changeDailyApiLimit(projectId, newApiPointsDailyLimit);
    return res.status(200).json({message: "Daily API Points Limit Changed!"});
});

const getUserProjects = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const projects = await apiProjectService.getUserProjects(userId);
    return res.status(200).json(projects);
});

export {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    changeDailyApiLimit,
    getUserProjects,
};