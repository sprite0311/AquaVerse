import express from 'express'
import { createProject, getProjects, getProject, likeProject } from '../controllers/projects.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/:id', getProject)
router.get('/', getProjects);
router.post('/', auth, createProject);
router.patch('/:id/likeBlog',auth, likeProject);


export default router