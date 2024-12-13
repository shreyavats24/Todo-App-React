const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
const todoapp = require("./routes/todoRoutes");
app.use(todoapp);
app.listen(8000, (err) => {
    if (err) {
      console.log("Error Connecting Server");
    } else console.log("Server is connected!!");
});