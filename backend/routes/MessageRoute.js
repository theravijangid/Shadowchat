const express = require("express");
const router = express.Router();
const Chat = require("../models/ChatModel");
const Message = require("../models/MessageModel");
const fetchUser = require("../middleware/fetchUserMiddleware");

router.get("/getMessages/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chat_id: chatId })
      .populate("sender_id", "name email")
      .sort({ createdAt: 1 });

    if (!messages) {
      return res
        .status(404)
        .json({ message: "No messages found for this chat." });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      message: "Error fetching messages",
      error: error.message,
    });
  }
});

router.get("/getChatList", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const chatList = await Chat.find({ participants: userId })
      .populate("participants", "name email")
      .populate({
        path: "latestMessage", // Populate the latest message field
        populate: {
          path: "sender_id", // Populate the sender of the latest message
          select: "name email",
        },
      })
      .sort({ "updatedAt": -1 });

    res.status(200).json(chatList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chat list", error: error.message });
  }
});

router.post("/createChat", async (req, res) => {
  const { sender_id, receiver_id } = req.body;

  try {
    let chat = await Chat.findOne({
      participants: { $all: [sender_id, receiver_id] },
    }).populate("participants", "name email");

    if (!chat) {
      const newChat = new Chat({
        participants: [sender_id, receiver_id],
        // latestMessage: ""
      });
      await newChat.save();
      await newChat.populate("participants", "name email");
      return res.status(201).send(newChat);
    }
    return res.status(201).send(chat);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
