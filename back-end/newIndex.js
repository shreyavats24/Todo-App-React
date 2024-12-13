// this index page have routes that are handled based on multiple user todo and
//  have login and signup features based on which todo list is displayed

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
const {isAutheticated} = require("./middlewares/Authentication");
// const mysql = require("mysql2");
// const todo = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "Shreya123#",
//   database: "todoapp",
// });
// const {
//   comparePassword,
//   bcryptPassword,
// } = require("./controllers/bcryptPassword");
// const { getUser, makeToken } = require("./controllers/token");
const todoController= require("./controllers/todoController");
// todo.connect((err) => {
//   if (err) console.log("Error Connecting!!");
//   else console.log("Connected!!");
// });


// app.get("/todo",isAutheticated, (req, res) => {
//     const user = getUser(req.cookies.mycookie);
//     todo.query("Select * from todolist WHERE user_id = ?;",[user.id], (err, data) => {
//     if (err) console.log(err);
//     else {
//         // console.log(data);
//       res.json(data);
//     }
//   });
// });
app.get("/todo",isAutheticated,todoController.getTodoList);
app.post("/login",todoController.loginUser);

// app.post("/login", (req, res) => {
//   console.log("/login");
//   let password = req.body.password;
//   let email = req.body.email;
//   if (email.trim() != "" && password.trim() != "") {
//     let query = `SELECT user_id, username,password FROM users WHERE username = ?;`;
//     todo.query(query, [email], async (err, result) => {
//       if (err) console.log("Error in Finding User!!", err);
//       else {
//         console.log("data:", result);
//         if (result.length > 0) {
//           let status = await comparePassword(password, result[0].password);
//           if (status) {
//             let user = result[0];
//             console.log("User:",user);
//             let token =await makeToken(user);
//             res.status(200).json({ message: "User Authenticated!!" ,token:token});
//         }
//           else res.status(401).json({ message: "Invalid Credential!!!" });
//         } else {
//           res.status(404).json({ message: "User Not found!!!" });
//         }
//       }
//     });
//   }
// });
// app.post("/signup", async (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;

//   if (email.trim() != "" && password.trim() != "") {
//     todo.query(
//       "SELECT username,password FROM users WHERE username = ?",
//       [email],
//       async (err, result) => {
//         // console.log(result);
//         if (err) console.log("Error Occured!!", err);
//         else if (result.length > 0) {
//           res.json({ message: "User Already Exists" });
//         } else {
//           password = await bcryptPassword(password);
//           let query = "INSERT INTO users (username,password) VALUES (?,?)";
//           todo.query(query, [email, password], (err, data) => {
//             if (err) console.log(err);
//             else {
//               console.log("Sucessfully Registered!!", data);
//               res.json({message:"Sucessfully Registered!!"});
//             }
//           });
//         }
//       }
//     );
//   }
// });
app.post("/signup",todoController.createNewUser);
app.post("/saveTask",isAutheticated,todoController.saveTask)
// app.post("/saveTask",isAutheticated,(req, res) => {
//   let data = req.body.desc;
//   // console.log(data);]
//   const user = getUser(req.cookies.mycookie);
//   console.log(user);
//   let q = "INSERT INTO todolist (user_id,task) VALUES(?,?)  ";
//   let task = [user.id,data];
//   todo.query(q, task, (err, result) => {
//     if (err) console.log("Error Inserting task:", err);
//     else {
//       let q = "select * from todolist where task_id=LAST_INSERT_ID();";
//       todo.query(q, (err, data) => {
//         if (err) console.log(err);
//         else {
//           console.log(data);
//           res.json(data);
//         }
//       });
//     }
//   });
//   // res.json(data);
// });
app.put("/updateTask",isAutheticated,todoController.updateTask)
// app.put("/updateTask", (req, res) => {
//   let id = req.body.id;
//   let task = req.body.task;
//   let query = `UPDATE todolist SET task = ? WHERE task_id = ?;`;
//   todo.query(query, [task, id], (err, result) => {
//     if (err) console.log("Error Updating in DB", err);
//     else res.json(result);
//   });
// });
// app.put("/updateCheck", (req, res) => {
//   let update = req.body.check;
//   let id = req.body.id;
//   let query = "UPDATE todolist SET completed = ? WHERE task_id = ? ;";
//   todo.query(query, [update, id], (err, data) => {
//     if (err) console.log(err);
//     else {
//       res.json(data);
//     }
//   });
// });
app.put("updateCheck",isAutheticated,todoController.updateCheckBox);
app.delete("/deleteTask/:id",isAutheticated,todoController.deleteTask);
// app.delete("/deleteTask/:id", (req, res) => {
//   let id = req.params.id;
//   let query = `DELETE from todolist WHERE task_id = ?;`;
//   // let query = "TRUNCATE TABLE todo;";
//   todo.query(query, [id], (err, data) => {
//     if (err) console.log("Error Updating in DB", err);
//     else res.json(data);
//   });
// });
app.listen(8000, (err) => {
  if (err) {
    console.log("Error Connecting Server");
  } else console.log("Server is connected!!");
});
