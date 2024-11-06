import Conversation from "../models/conversation.js";
import mongoose from "mongoose";

export const createConversation = async (req, res) => {
  const { sender, message} = req.body;

  console.log(sender);
  const newConversation = new Conversation({
    sender, message
  });
  try {
    await newConversation.save();
    res.status(200).json({ newConversation });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find();
    res.status(200).json({ conversation });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
