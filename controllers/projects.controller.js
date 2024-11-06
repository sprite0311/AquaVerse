import Project from "../models/project.js";
import mongoose from "mongoose";

export const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getProjects = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 9999;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Project.countDocuments({});
    const posts = await Project.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    // console.log(Projects);
    res
      .status(200)
      .json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createProject = async (req, res) => {
  const data = req.body;
  const newProject = new Project({
    ...data,
    author: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newProject.save();
    res.status(201).json({ newProject });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const likeProject = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  console.log(req.userId);
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const post = await Project.findById(id);
  console.log(post);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await BlogPost.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
};
