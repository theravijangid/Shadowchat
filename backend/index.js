var express = require("express");
var cors = require("cors");
const http = require("http");
const setupSocket = require('./socket/Socket');
var app = express();
const port = 5000;

const connectToDatabase = require("./db");

// app.use(cors({
//   origin: ['http://localhost:3000','https://chatapp-nine-gray.vercel.app'], 
//   methods: ['GET','PUT','POST','DELETE'],
//   credentials: true,
// }));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // If you're using cookies
}));

// app.use(cors());
app.use(express.json());

connectToDatabase();

app.get("/", (req, res) => {
  res.send("Hello Vercel bhai");
});

// Routes
app.use("/auth", require("./routes/AuthRoute"));
app.use("/chat", require("./routes/MessageRoute"));

const server = http.createServer(app);

setupSocket(server);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
