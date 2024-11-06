import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: String,
    description: String,
    researcher: String,
    successDate:{
        type: Date,
        default: new Date
    },
    observation: String,
    likes:{
        type: [String],
        default:[]
    }
})
const Project = mongoose.model('project', projectSchema)
export default Project