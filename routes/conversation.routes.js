import express from 'express'
import { createConversation, getConversation } from '../controllers/conversation.controller.js'

const router = express.Router()

router.post('/', createConversation)
router.get('/', getConversation)

export default router