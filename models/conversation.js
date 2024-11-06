import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    sender: String,
    message: String,
})
const Conversation = mongoose.model('conversation',conversationSchema)
export default Conversation