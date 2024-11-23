const socketIo = require("socket.io");
const Message = require("../models/MessageModel");
const Chat = require("../models/ChatModel");

const setupSocket = (server) => {
  const io = socketIo(server, {
    path: '/socket',
    wssEngine: ['ws','wss'],
    transports: ['websocket','polling'],
    cors: {
      origin: "https://chatapp-nine-gray.vercel.app",
      // origin: "https://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    },
    allowEIO3: true,
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("registerUser", (userId) => {
      socket.join(userId); // UserId ke room mein user join
      console.log(`User joined room with userId: ${userId}`);
    });

    // Leave the userId-based room
    socket.on("leaveUserRoom", (userId) => {
      socket.leave(userId); // UserId ke room se leave
      console.log(`User left room with userId: ${userId}`);
    });

    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat room: ${chatId}`);

      Message.find({ chat_id: chatId })
        .populate("sender_id", "name email")
        .then((messages) => {
          socket.emit("previousMessages", messages);
        });
    });

    socket.on("leaveRoom", (chatId) => {
      socket.leave(chatId);
      console.log(`User left room: ${chatId}`);
    });

    // Handle fetching chat user
    socket.on("fetchChatUser", async (chatId) => {
      const chatUser = await Chat.findById(chatId).populate(
        "participants",
        "name email"
      );
      socket.emit("chatUserResponse", chatUser);
    });

    socket.on("sendMessage", async ({ chatId, newMessage, loggedInUserId }) => {
      const newMsg = new Message({
        chat_id: chatId,
        sender_id: loggedInUserId,
        content: newMessage,
      });

      await newMsg.save();

      // Update the latest message in the chat
      await Chat.findByIdAndUpdate(chatId, { latestMessage: newMsg._id });

      const populatedMsg = await Message.findById(newMsg._id)
        .populate("sender_id", "name email")
        .exec();
      io.to(chatId).emit("receiveMessage", populatedMsg);
      const chat = await Chat.findById({ _id: chatId }).populate(
        "participants"
      );

      const participants = chat.participants.map((user) => user._id.toString());

      // Emit chatList update to all participants using their userId
      participants.forEach((userId) => {
        io.to(userId).emit("updateChatList");
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = setupSocket;
